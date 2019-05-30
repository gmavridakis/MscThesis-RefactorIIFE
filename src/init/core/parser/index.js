const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const IIFEDeclarationCollection = require('../../../main/core/model/Collection/IIFEDeclarationCollection');
const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');

var Promise = require('bluebird');

function ask(question) {
    console.log(question);
    return new Promise(function(resolve) {
        process.stdin.once('data', function(data) {
            resolve(data.toString().trim());
        });
    });
}

ask('Give full path to js folder : (e.g. gregor - current path is : src/init/resources )')
    .then(function(reply) {
        // let paths = fileUtils.getRecursivePaths(reply);
        // console.log(paths);
        let identified_files = fileUtils.getRecursivePaths(reply);
        console.log('Identified ('+identified_files.length +') files in total! ');
        if (identified_files == '-1') {
            console.log('No IIFE was identified...');
        } 
        else {
            //for each file
            for (let i = 0; i < identified_files.length; i++) {
                let path = './' + identified_files[i];
                console.log('Checking file : ' + path);
                // //if .js not empty
                if ( validInit(path)) {
                    console.log('validated')
                    let initCode = fileUtils.readFileSync(path).trim();
                    console.log(initCode);
                     //initialize model
                     let nodesCollection = JSCodeshiftParser.parse(initCode);
                     console.log('nodecollections : ');
                     console.log(nodesCollection);
                    let filename = identified_files[i];
                    IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection,path);
                    iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
                    console.log(iifeDeclarations);
                } else {
                    console.log('Proceeding...');
                }
            }

            // prepare to write data to csv
            iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
            functionDeclarations = FunctionDeclarationCollection.getFunctionsInCollectionArray();
            if(iifeDeclarations.length > 0){
                exportCSV();
                console.log('Check the results under : ' + path + '(results.csv is generated successfully!)');    
            }
            else{
                console.log('No IIFE was identified...');
            }                        
        }
    }
).finally(process.exit);



function validInit(path){
/*
    *** BELOW ERROR IS GENERATED DURING FILE READING - AVOID CRUSHING ***
        (function(factory) {
            // Support three module loading scenarios
            if (typeof define === 'function' && define['amd']) {
                // [1] AMD anonymous module
                define(['exports', 'require'], factory);
            } else if (typeof exports === 'object' && typeof module === 'object') {
                // [2] CommonJS/Node.js
                factory(module['exports'] || exports);  // module.exports is for Node.js
            } else {
                // [3] No module loader (plain <script> tag) - put directly in global namespace
                factory(window['ko'] = {});
            }
        }(function(koExports, amdRequire){
 */
    let initCode = fileUtils.readFileSync(path).trim();
    if(
        initCode != '' 
        && initCode != '}());'
        && !initCode.includes('// [3] No module loader (plain <script> tag) - put directly in global namespace')
        && !initCode.includes('// (0, eval)(\'this\') is a robust way of getting a reference to the global object')
        && !initCode.includes('Should be able to parse object literals containing child objects, arrays, function literals, and newlines')
        && !initCode.includes('Should be able to chain templates, rendering one from inside another')
        ){
        return true;
    }
    else{
        return false;
    }

}

function exportCSV(){
    counter = 0;
    _path = 'src/init/test.csv';
    //_path = 'src/init/gregor.csv';
    data = []; //init data before starting scanning iife functions
    if(!fileUtils.fileCreated(_path)){
        data.push(['counter', 
            'name', 
            'function_name',
            'real_parameter', 
            'typical_parameter',
            'returns_value', 
            'file_name', 
            'start_row',
            'start_column',
            'end_row', 
            'end_column',
        ]);             
    }
    for (let j=0; j<iifeDeclarations.length; j++) {
        counter++;
        data.push(['\n'+counter, 
            functionDeclarations[j].NAME,
            functionDeclarations[j].TYPE,
            iifeDeclarations[j].ACTUAL_PARAMETERS.total_counts,
            functionDeclarations[j].TYPICAL_PARAMETERS,
            iifeDeclarations[j].RETURN_DETAILS.has_return_value,
            iifeDeclarations[j].PATH,
            iifeDeclarations[j].START.startline,
            iifeDeclarations[j].START.startcolumn,
            iifeDeclarations[j].END.endline,
            j!=iifeDeclarations.length-1?iifeDeclarations[j].END.endcolumn:iifeDeclarations[j].END.endcolumn+',',                        
        ]);
    }        

    fileUtils.appendFileSync(_path, data);
}

/*
    //console.log(iifeDeclarations[j].IIFE);
    //console.log(functionDeclarations[j].FUNCTION);
    //name ready
    //console.log(functionDeclarations[j].NAME);
    //type ready
    //console.log(functionDeclarations[j].TYPE);
    //actual parameters ready
    //console.log(iifeDeclarations[j].ACTUAL_PARAMETERS.total_counts);
    //console.log(iifeDeclarations[j].ACTUAL_PARAMETERS.paramaters);
    //typical parameters ready
    //console.log(functionDeclarations[j].TYPICAL_PARAMETERS);
    //return details ready
    // console.log(iifeDeclarations[j].RETURN_DETAILS.has_return_value);
    // console.log(iifeDeclarations[j].RETURN_DETAILS.returned_to_node);
    // console.log(iifeDeclarations[j].RETURN_DETAILS.return_statement_node);
    //path ready
    //console.log(iifeDeclarations[j].PATH);
    //start / end ready
    // console.log(iifeDeclarations[j].START.startline);
    // console.log(iifeDeclarations[j].START.startcolumn);
    // console.log(iifeDeclarations[j].END.endline);
    // console.log(iifeDeclarations[j].END.endcolumn);
*/
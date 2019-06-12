const fileUtils = require('../../../main/io/fileutil');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const IIFEFunctionRefactor = require('../../../main/core/parser/FunctionToClassRefactor');
const IIFEDeclarationCollection = require('../../../main/core/model/Collection/IIFEDeclarationCollection');
const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');


var Promise = require('bluebird');

function ask(question) {
    console.log(question);
    return new Promise(function(resolve) {
        process.stdin.once('data', function(data) {
            resolve(data.toString().trim());
        });
    });
}

ask('Give full path to js folder : (e.g. ref-class - current path is : src/init/resources )')
    .then(function(reply) {
        //initIdentification(reply);
        /* completed function to class refactor -> resource : 'ref-class' */
        //refactorFunctionToClass(reply); 
        findVariablesInFiles(reply);
    }
).finally(process.exit);

function findVariablesInFiles(reply){
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
             //if .js not empty
            if ( validInit(path)) {
                let initCode = fileUtils.readFileSync(path).trim();
                var tern = require("tern")
                var estraverse = require("estraverse")
                let test = "var a = 5; d = 4; a += 10; "
                var ternServer = new tern.Server({})
                var identifierPositions = []
                ternServer.on("postParse", function(ast){
                    estraverse.traverse(ast, {
                        enter: function(node){
                            if (node.type === "Identifier") {
                                identifierPositions.push(node.end)
                            }
                        }
                    })
                })
                ternServer.addFile(path, initCode)
                
                identifierPositions.forEach(function(identifierPosition){
                    var requestDetails = {
                        query: {
                            type: "definition",
                            file: path,
                            end: identifierPosition
                        }
                    }
                    ternServer.request(requestDetails, function(error, success){
                        console.log(success)
                    })
                })     
            }
        }
    }    
}

function refactorFunctionToClass(reply){
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
             //if .js not empty
            if ( validInit(path)) {
                let initCode = fileUtils.readFileSync(path).trim();
                let nodesCollection = JSCodeshiftParser.parse(initCode);
                //console.log(nodesCollection);
                let refactored_class = IIFEFunctionRefactor.classRefactor(nodesCollection);
                console.log('*** Before : ***');
                console.log(initCode);
                console.log('*** After : ***');
                console.log(refactored_class);
            }
        }
    }
}

function initIdentification(reply){
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
                let initCode = fileUtils.readFileSync(path).trim();
                // console.log(initCode);
                // console.log(JSCodeshiftParser.parse(initCode));
                // initialize model
                let nodesCollection = JSCodeshiftParser.parse(initCode);
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


function validInit(path){
/*
    *** BELOW ERRORS ARE GENERATED DURING FILE READING - AVOID CRUSHING ***
*/
    let initCode = fileUtils.readFileSync(path).trim();
    if(
        initCode != '' 
        // knockout-master
        && initCode != '}());'
        && !initCode.includes('// [3] No module loader (plain <script> tag) - put directly in global namespace')
        && !initCode.includes('// (0, eval)(\'this\') is a robust way of getting a reference to the global object')
        && !initCode.includes('Should be able to parse object literals containing child objects, arrays, function literals, and newlines')
        && !initCode.includes('Should be able to chain templates, rendering one from inside another')
        // added for melonJS-master
        && !initCode.includes('Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.')
        && !initCode.includes('jQuery v1.8.3 jquery.com | jquery.org/license */')
        // added for piskel-master
        && !initCode.includes('//# sourceMappingURL=gif.js.map')
        && !initCode.includes('zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License')
        && !initCode.includes('{\"tests\" : [\"pen.drawing.json\",\"bucket.drawing.json\",\"color.picker.2.json\"')
        && path!='./src/init/resources/piskel-master/test/drawing/DrawingTests.browser.js'
        && path!='./src/init/resources/piskel-master/test/drawing/DrawingTests.pensize.js'
        && path!='./src/init/resources/piskel-master/test/drawing/DrawingTests.perf.js'
        // added for bluebird
        && path!='./src/init/resources/bluebird-master/bluebird-master/tools/job-runner/job-runner.js'
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
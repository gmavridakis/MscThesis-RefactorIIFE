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

ask('Give full path to js folder : (e.g. init/resources/gregor )')
    .then(function(reply) {
        let identified_files = fileUtils.getFilePaths(reply);
        console.log('Identified files : ' + identified_files);
        if (identified_files == '-1') {
            console.log('No IIFE was identified...');
        } 
        else {
            //for each file
            for (let i = 0; i < identified_files.length; i++) {
                let path = './src/' + reply + '/' + identified_files[i];
                console.log('Checking file : ' + path);
                let initCode = fileUtils.readFileSync(path).trim();
                //if .js not empty
                if (initCode != '') {
                    //initialize model
                    let nodesCollection = JSCodeshiftParser.parse(initCode);
                    let filename = identified_files[i];
                    IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection,path);
                    iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
                    //console.log(iifeDeclarations);
                } else {
                    console.log('No IIFE was identified...');
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


function exportCSV(){
    counter = 0;
    _path = 'src/init/results_backbone.csv';
    _path = 'src/init/gregor2.csv';
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
        data.push(',');     
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
            iifeDeclarations[j].END.endcolumn                        
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
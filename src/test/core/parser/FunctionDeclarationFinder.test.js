const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const IIFEDeclarationCollection = require('../../../main/core/model/Collection/IIFEDeclarationCollection');
const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');

const IIFE_DECLARATIONS = 19;
const initCode = fileUtils.readFileSync('./src/test/resources/functions.js').trim();
const nodesCollection = JSCodeshiftParser.parse(initCode);
let iifeDeclarations;
let functionDeclarations;
let util = require('util');

beforeEach(() => {});

test('number of IIFE declarations detected', () => {
    
    IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection);
    
    iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
    functionDeclarations = FunctionDeclarationCollection.getFunctionsInCollectionArray();

    //fileUtils.writeFileSync('src/test/results-iife.csv', iifeDeclarations);    
    //fileUtils.writeFileSync('src/test/results-iife.csv', JSON.stringify(iifeDeclarations));    
    let str='';
    
    for(let i=0;i<iifeDeclarations.length;i++){
        let all_iife_info = [];
        all_iife_info.push(' TYPE : ' +(iifeDeclarations[i]).value['type']);
        all_iife_info.push(' START : ' +(iifeDeclarations[i]).value['start']);
        all_iife_info.push(' END : ' +(iifeDeclarations[i]).value['end']);

        let all_function_info = [];
        all_function_info.push(' TYPE : ' +(functionDeclarations[i])['type']);
        all_function_info.push(' START : ' +(functionDeclarations[i])['start']);
        all_function_info.push(' END : ' +(functionDeclarations[i])['end']);

        //console.log('Index of IIFE : ');
        str = ' Index of IIFE : ';
        fileUtils.appendFileSync('src/test/results-iife.csv', str);
        //console.log(i);
        fileUtils.appendFileSync('src/test/results-iife.csv', i);
        //console.log('All relevant content of IIFE : ');
        str = ' All relevant content of IIFE : ';
        fileUtils.appendFileSync('src/test/results-iife.csv', str);
        //console.log(iifeDeclarations[i]);    
        for(let i=0;i<all_iife_info.length;i++){
            fileUtils.appendFileSync('src/test/results-iife.csv', all_iife_info[i]);
        }
        //console.log('Pure IIFE function : ');
        str = ' Pure IIFE function : ';
        fileUtils.appendFileSync('src/test/results-iife.csv', str);
        //console.log(functionDeclarations[i]);    
        for(let i=0;i<all_function_info.length;i++){
            fileUtils.appendFileSync('src/test/results-iife.csv', all_function_info[i]);
        }
        
        fileUtils.appendFileSync('src/test/results-iife.csv', '\n');
    }
 

    expect(iifeDeclarations).toHaveLength(IIFE_DECLARATIONS);
});

/*
var Promise = require('bluebird');
function ask(question) {
    console.log(question);
    return new Promise(function (resolve) {
    process.stdin.once('data', function (data) {
        resolve(data.toString().trim());
    });
    });
}
ask('Give full path to js folder : ')
    .then(function (reply) {
    console.log('user replied', reply);
    })
    .finally(process.exit);
*/
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

beforeEach(() => {

});

test('number of IIFE declarations detected', () => {

    IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection);
    //fileUtils.writeFileSync('src/test/results-iife.csv', JSON.stringify(IIFEDeclarationFinder.getIIFEDetails(),null,'\n'));    
    
    iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
    functionDeclarations = FunctionDeclarationCollection.getFunctionsInCollectionArray();

    for(let i=0;i<iifeDeclarations.length;i++){
        console.log('Index of IIFE : ');
        console.log(i);
        console.log('All relevant content of IIFE : ');
        console.log(iifeDeclarations[i]);        
        console.log('Pure IIFE function : ');
        console.log(functionDeclarations[i]);    
    }
    

    expect(iifeDeclarations).toHaveLength(IIFE_DECLARATIONS);
});
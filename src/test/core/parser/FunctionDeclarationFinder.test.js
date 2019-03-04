const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');
const JSON = require('circular-json');

const IIFE_DECLARATIONS = 6;
const initCode = fileUtils.readFileSync('./src/test/resources/functions.js').trim();
const nodesCollection = JSCodeshiftParser.parse(initCode);
let iifeDeclarations;

beforeEach(() => {
    const koa = new FunctionDeclarationCollection;
    //koa = FunctionDeclarationCollection.getDeclarationCollection();
});

test('number of IIFE declarations detected', () => {
    IIFEDeclarationFinder.SubmitInitialCode(initCode);
    iifeDeclarations = IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection);
    fileUtils.writeFileSync('src/test/results-iife.csv', JSON.stringify(IIFEDeclarationFinder.getIIFEDetails(),null,'\n'));    

    console.log('--------------Final Results of IIFEDeclarationNodes Array-----------------');
    console.log(iifeDeclarations); 
    console.log('--------------------------------------------------------------------------');


    expect(iifeDeclarations).toHaveLength(IIFE_DECLARATIONS);
});
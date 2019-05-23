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

    expect(iifeDeclarations).toHaveLength(IIFE_DECLARATIONS);
    
});
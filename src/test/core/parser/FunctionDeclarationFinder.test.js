const FunctionDeclarationFinder = require('../../../main/core/parser/FunctionDeclarationFinder');
const VariableDeclarationFinder = require('../../../main/core/parser/VariableDeclarationFinder');
const ExpressionDeclarationFinder = require('../../../main/core/parser/ExpressionDeclarationFinder');
const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');

const FUNCTION_DECLARATIONS = 2;
const VARIABLE_DECLARATIONS = 4;
const EXPRESSION_DECLARATIONS = 2;
const IIFE_DECLARATIONS = 2;

let functionDeclarations;
let variableDeclarations;
let expressionDeclarations;
let iifeDeclarations;

beforeEach(() => {
    const nodesCollection = JSCodeshiftParser.parse(fileUtils.readFileSync('./src/test/resources/functions.js').trim());
    functionDeclarations = FunctionDeclarationFinder.getFunctionDeclarations(nodesCollection);
    variableDeclarations = VariableDeclarationFinder.getVariableDeclarations(nodesCollection);
    expressionDeclarations = ExpressionDeclarationFinder.getExpressionDeclarations(nodesCollection);
    iifeDeclarations = IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection);
});


// test('number of function declarations detected', () => {
//     expect(functionDeclarations).toHaveLength(FUNCTION_DECLARATIONS);
// });

test('number of variable declarations detected', () => {
    expect(variableDeclarations).toHaveLength(VARIABLE_DECLARATIONS);
});

test('number of IIFE declarations detected', () => {
    expect(iifeDeclarations).toHaveLength(IIFE_DECLARATIONS);
});

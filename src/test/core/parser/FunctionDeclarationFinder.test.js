const FunctionDeclarationFinder = require('../../../main/core/parser/FunctionDeclarationFinder');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');


const FUNCTION_DECLARATIONS = 2;

let functionDeclarations;

beforeEach(() => {
    const nodesCollection = JSCodeshiftParser.parse(fileUtils.readFileSync('./src/test/resources/functions.js').trim());
    functionDeclarations = FunctionDeclarationFinder.getFunctionDeclarations(nodesCollection);
});


test('number of function declarations detected', () => {
    expect(functionDeclarations).toHaveLength(FUNCTION_DECLARATIONS);
});

const j = require('./JSCodeshiftWrapper.js').j;
const FunctionDeclaration = require('../model/FunctionDeclaration.js');
const VariableDeclaration = require('../model/VariableDeclaration');

const FUNCTION_DECLARATION_QUERY = {target: j.FunctionDeclaration};
const VARIABLE_DECLARATION_QUERY = {target: j.ExpressionStatement};


class FunctionDeclarationFinder {

    constructor() {
    }

    /**
     * Returns an array of FunctionDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getFunctionDeclarations(rootNode) {

        let functionDeclarationNodes = [];


        //find all FunctionDeclaration AST nodes and push each of them to array
        rootNode.find(FUNCTION_DECLARATION_QUERY.target)
                .forEach(functionDeclarationNode => {
                    console.log('---------FUNCTION DECLARATION----------');
                    console.log(functionDeclarationNode);
                    console.log('---------');                
                functionDeclarationNodes.push(new FunctionDeclaration(functionDeclarationNode.value.id.name, functionDeclarationNode));
            });

        return functionDeclarationNodes;
    }
    static getVariableDeclarations(rootNode) {

        let variableDeclarationNodes = [];

        //find all FunctionDeclaration AST nodes and push each of them to array
        rootNode.find(VARIABLE_DECLARATION_QUERY.target)
                .forEach(variableDeclarationNode => {
                    console.log('---------VARIABLE DECLARATION (EXPRESSION STATEMENT)----------');
                    console.log(variableDeclarationNode);
                    console.log('---------');
                    //variableDeclarationNodes.push(new FunctionDeclaration(variableDeclarationNode.value.id.name, variableDeclarationNode));
            });

        return variableDeclarationNodes;
    }




}

module.exports = FunctionDeclarationFinder;
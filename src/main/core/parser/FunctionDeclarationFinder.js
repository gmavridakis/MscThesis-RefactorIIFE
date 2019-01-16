const j = require('./JSCodeshiftWrapper.js').j;
const FunctionDeclaration = require('../model/FunctionDeclaration.js');

const FUNCTION_DECLARATION_QUERY = {target: j.FunctionDeclaration};

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
                
                functionDeclarationNodes.push(new FunctionDeclaration(functionDeclarationNode.value.id.name, functionDeclarationNode));
            });

        return functionDeclarationNodes;
    }

}

module.exports = FunctionDeclarationFinder;
const j = require('./JSCodeshiftWrapper.js').j;
const VariableDeclaration = require('../model/VariableDeclaration');

const VARIABLE_DECLARATION_QUERY = {target: j.VariableDeclaration};

class VariableDeclarationFinder {

    constructor() {
    }

    /**
     * Returns an array of VariableDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getVariableDeclarations(rootNode) {

        let variableDeclarationNodes = [];

        //find all VariableDeclaration AST nodes and push each of them to array
        rootNode.find(VARIABLE_DECLARATION_QUERY.target)
                .forEach(variableDeclarationNode => {
                    // console.log('---------VARIABLE DECLARATION----------');
                    // console.log(variableDeclarationNode);
                    // console.log('---------');
                    variableDeclarationNodes.push(new VariableDeclaration(variableDeclarationNode.value.declarations[0].id.name, variableDeclarationNode));
            });

        return variableDeclarationNodes;
    }

}

module.exports = VariableDeclarationFinder;
const j = require('./JSCodeshiftWrapper.js').j;
const ExpressionDeclaration = require('../model/ExpressionDeclaration');

const EXPRESSION_DECLARATION_QUERY = {target: j.ExpressionStatement};

class ExpressionDeclarationFinder {

    constructor() {
    }

    /**
     * Returns an array of ExpressionDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getExpressionDeclarations(rootNode) {

        let expressionDeclarationNodes = [];

        //find all ExpressionDeclaration AST nodes and push each of them to array
        rootNode.find(EXPRESSION_DECLARATION_QUERY.target)
                .forEach(expressionDeclarationNode => {
                    if (expressionDeclarationNode.value.expression.type == 'CallExpression'){
                        //console.log('---------SAVES ONLY CALL EXPRESSION DECLARATIONS----------');
                        //console.log(expressionDeclarationNode);
                        //console.log('---------');
                            expressionDeclarationNodes.push(new ExpressionDeclaration(expressionDeclarationNode.value.expression.type, expressionDeclarationNode));
                    }
            });

        return expressionDeclarationNodes;
    }

}

module.exports = ExpressionDeclarationFinder;
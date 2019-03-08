const j = require('./JSCodeshiftWrapper.js').j;
const Statement = require('../model/Statement');
const STATEMENT_DECLARATION_QUERY = {target: j.FunctionDeclaration};

class StatementDeclarationFinder {

    constructor() {}

    static getFunctionDeclarations(rootNode) {

        let statementNodes = [];


        //find all FunctionDeclaration AST nodes and push each of them to array
        rootNode.find(STATEMENT_DECLARATION_QUERY.target)
                .forEach(statementNode => {
                    
            });

        return statementNodes;
    }
}

module.exports = StatementDeclarationFinder;
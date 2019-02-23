const j = require('./JSCodeshiftWrapper.js').j;
const IIFEDeclaration = require('../model/IIFEDeclaration');

const IIFE_DECLARATION_QUERY = {target: j.ExpressionStatement};
const IIFE_VARIABLE_QUERY = {target: j.VariableDeclaration};

let IIFEDeclarationNodes = [];

class IIFEDeclarationFinder {

    constructor() {
    }
    

    /**
     * Returns an array of IIFEDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getIIFEDeclarations(rootNode) {

        //find all IIFEDeclaration AST nodes and push each of them to array
        this.IIFESimplestForm(rootNode);      
        this.IIFEVariableDeclaration(rootNode); 
        console.log(IIFEDeclarationNodes);   
        return IIFEDeclarationNodes;
    }

    static IIFEVariableDeclaration(rootNode) {
        rootNode.find(IIFE_VARIABLE_QUERY.target)
            .forEach(IIFEVariableNode => {
                if(IIFEVariableNode.value.declarations[0].init != undefined){
                    if(IIFEVariableNode.value.declarations[0].init.callee!=undefined){
                        let callee = IIFEVariableNode.value.declarations[0].init.callee.type;
                        if(callee == 'FunctionExpression'){
                            // console.log('---------IIFE VARIABLE FORM DECLARATION----------');
                            // console.log(IIFEVariableNode.value.declarations[0].init.callee.id.name);
                            // console.log('-----------------------------------------------------');
                            let _name = IIFEVariableNode.value.declarations[0].init.callee.id.name;
                            let _node = IIFEVariableNode.value.declarations[0].init.callee;
                            IIFEDeclarationNodes.push(new IIFEDeclaration(_name, _node));
                        }
                    }   
                }
            });
    }

    static IIFESimplestForm(rootNode){
        rootNode.find(IIFE_DECLARATION_QUERY.target)
            .forEach(IIFEDeclarationNode => {
                if ( IIFEDeclarationNode.value.expression.type == 'CallExpression'){
                    if(IIFEDeclarationNode.value.expression.callee.type == 'FunctionExpression'){
                        if(IIFEDeclarationNode.value.expression.callee.id.name != 'undefined') {
                            // console.log('---------IIFE SIMPLEST FORM DECLARATION----------');
                            // console.log(IIFEDeclarationNode.value.expression.callee.id.name);
                            // console.log('-----------------------------------------------------');
                            let _name = IIFEDeclarationNode.value.expression.callee.id.name;
                            let _node = IIFEDeclarationNode.value.expression.callee;
                            IIFEDeclarationNodes.push(new IIFEDeclaration(_name, _node));
                        }
                    }
                }        
            });
    }


}

module.exports = IIFEDeclarationFinder;
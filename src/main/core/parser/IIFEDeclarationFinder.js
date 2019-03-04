const j = require('./JSCodeshiftWrapper.js').j;
const IIFEDeclaration = require('../model/IIFEDeclaration');

const IIFE_DECLARATION_QUERY = {target: j.ExpressionStatement};
const IIFE_VARIABLE_QUERY = {target: j.VariableDeclaration};

let IIFEDeclarationNodes = [];
let initCode;

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
        return IIFEDeclarationNodes;
    }

    static getIIFEDetails(){
        let $ = require("jquery");
        let arr = [];
        $.each( IIFEDeclarationNodes, function( index, value ){
            arr.push('Index : ' +index);
            arr.push('Name : ' +value.IIFEName);
            arr.push('Node : ' +value.IIFENode);
        });
        return arr;
    }

    static isDuplicateEntry(name,start,end){
        var $ = require("jquery");
        let res = false;
        $.each( IIFEDeclarationNodes, function( index, value ){
            let _name = value.IIFEName;
            let _start = value.IIFEASTNode.start; 
            let _end = value.IIFEASTNode.end + 2; 
            if(_name == name && _start == start && _end == end){
                 res = true;
            }
        });
        return res;
    }

    static SubmitInitialCode(init){
        this.initCode = init;
    }

    static IIFEVariableDeclaration(rootNode) {
        rootNode.find(IIFE_VARIABLE_QUERY.target)
            .forEach(IIFEVariableNode => {
                if(IIFEVariableNode.value.declarations[0].init != undefined){
                    if(IIFEVariableNode.value.declarations[0].init.callee!=undefined){
                        let callee = IIFEVariableNode.value.declarations[0].init.callee.type;
                        if(callee == 'FunctionExpression'){
                            let _name = 'Unnamed';
                            if(IIFEVariableNode.value.declarations[0].init.callee.id != null){
                              _name = IIFEVariableNode.value.declarations[0].init.callee.id.name;
                            }
                            let _ASTnode = IIFEVariableNode.value.declarations[0].init.callee;
                            let _initNode = this.initCode;
                            let _funcDecl = new IIFEDeclaration(_name, _ASTnode, _initNode);
                            IIFEDeclarationNodes.push(_funcDecl);
                            _funcDecl.setIIFENode();
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
                        if(IIFEDeclarationNode.value.expression.callee.id != 'undefined') {
                            let _name = 'Unnamed';
                            if(IIFEDeclarationNode.value.expression.callee.id != null){
                                _name = IIFEDeclarationNode.value.expression.callee.id.name;
                            }
                            let _ASTnode = IIFEDeclarationNode.value.expression.callee;
                            let _initNode = this.initCode;
                            let _funcDecl = new IIFEDeclaration(_name, _ASTnode, _initNode);
                            IIFEDeclarationNodes.push(_funcDecl);
                            _funcDecl.setIIFENode();
                        }
                    }
                }        
            });
    }


}

module.exports = IIFEDeclarationFinder;
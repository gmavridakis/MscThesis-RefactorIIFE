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
        console.log('--------------Final Results of IIFEDeclarationNodes Array-----------------');
        console.log(IIFEDeclarationNodes);   
        console.log('--------------------------------------------------------------------------');
        return IIFEDeclarationNodes;
    }

    static isDuplicateEntry(name,start,end){
        var $ = require("jquery");
        let res = false;
        $.each( IIFEDeclarationNodes, function( index, value ){
            let _name = value.IIFEName;
            let _start = value.IIFEASTNode.start; 
            let _end = value.IIFEASTNode.end + 2; 
            //console.log('Checking : ' +_name +_start +_end +' with : ' +name +start +end);
            if(_name == name && _start == start && _end == end){
                 res = true;
            }
        });
        return res;
    }


    static IIFEVariableDeclaration(rootNode) {
        rootNode.find(IIFE_VARIABLE_QUERY.target)
            .forEach(IIFEVariableNode => {
                if(IIFEVariableNode.value.declarations[0].init != undefined){
                    if(IIFEVariableNode.value.declarations[0].init.callee!=undefined){
                        let callee = IIFEVariableNode.value.declarations[0].init.callee.type;
                        if(callee == 'FunctionExpression'){
                            let _name = IIFEVariableNode.value.declarations[0].init.callee.id.name;
                            let _node = IIFEVariableNode.value.declarations[0].init.callee;
                            let _start = IIFEVariableNode.value.declarations[0].init.start;
                            let _end = IIFEVariableNode.value.declarations[0].init.end;
                            //console.log('Sending : ' +_name + _start +_end);
                            //console.log('Result is : ' +this.isDuplicateEntry(_name,_start,_end));                            
                            if(!this.isDuplicateEntry(_name,_start,_end)){
                                IIFEDeclarationNodes.push(new IIFEDeclaration(_name, _node));
                            }
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
                            let _name = IIFEDeclarationNode.value.expression.callee.id.name;
                            let _node = IIFEDeclarationNode.value.expression.callee;
                            let _start = IIFEDeclarationNode.value.expression.start;
                            let _end = IIFEDeclarationNode.value.expression.end;
                            //console.log('Sending : ' +_name + _start +_end);
                            //console.log('Result is : ' +this.isDuplicateEntry(_name,_start,_end));
                            if(!this.isDuplicateEntry(_name,_start,_end)){
                                IIFEDeclarationNodes.push(new IIFEDeclaration(_name, _node));
                            }
                        }
                    }
                }        
            });
    }


}

module.exports = IIFEDeclarationFinder;
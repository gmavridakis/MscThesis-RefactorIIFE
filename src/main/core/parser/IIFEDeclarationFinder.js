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
    static SubmitInitialCode(init){
        this.initCode = init;
    }

    /* 
        The function getIIFEFunction() receives two objects :
        a) _start --> {startline : 2 , startcolumn : 20 } 
        b) _end --> {endline : 2 , endcolumn : 38 } 
        and according to these it goes to the initial code (not AST code)
        Init Code:
        ------------
        var x;
        var l= (function(){  return 'test';})();
        console.log('random text');
        ------------
        and will return an array with characters array[startline][startcolumn] - array[endline][endcolumn]
        so in our example it would return : function(){  return 'test';}   
    */
    static getIIFEFunction(_start,_end){
        //var $ = require("jquery");
        let output = [];
        let str = this.initCode;
        let lines = str.split(/\n/);
        for (let i = 0; i < lines.length; i++) {
            if(lines[i]!=undefined){
                output.push(lines[i]);
                //output.push($.trim(lines[i]));
            }
            else{
                output.push(' ');   
            }
            //console.log(output);
        }
        let final_node = '';
        let start = _start;
        let end = _end;        
        let end_line = end['endline'];
        let start_line = start['startline'];
        let start_column = start['startcolumn'];
        let end_column = end['endcolumn'];
        
        //IIFE in 1 line!
        if(start_line==end_line){
            let final_line = '';
            for(let j=start_column;j<end_column;j++){
                if(output[start_line-1][j]!=undefined){
                    final_line+=output[start_line-1][j]; 
                }
            }
            final_node += final_line;            
        }
        //IIFE in more lines!
        else{
            for (let line = start_line-1; line < end_line; line++) {

                if((line==start_line-1) || (line==end_line-1)){
                    if(line==start_line-1){
                        for(let j=start_column;j<=output[line].length;j++){
                            if(output[line][j]!=undefined){
                                final_node+=output[line][j];
                            } 
                        }                        
                    }
                    else{
                        for(let j=0;j<=end_column-1;j++){
                            if(output[line][j]!=undefined){
                                final_node+=output[line][j]; 
                            }
                        }                      
                    }
                }
                else{
                    if(output[line]!=undefined){
                        final_node += output[line]; 
                    }
                }
            }
        }
        
        final_node = final_node.replace(/[\r\n]/g, "");        
        return final_node;
    }

    /*
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
    */

    static IIFEVariableDeclaration(rootNode) {
        rootNode.find(IIFE_VARIABLE_QUERY.target)
            .forEach(IIFEVariableNode => {
                if(IIFEVariableNode.value.declarations[0]!= undefined){
                    if(IIFEVariableNode.value.declarations[0].init != undefined){
                        if(IIFEVariableNode.value.declarations[0].init.callee!=undefined){
                            let callee = IIFEVariableNode.value.declarations[0].init.callee;
                            if(callee.type == 'FunctionExpression'){
                                let _name = 'Unnamed';
                                if(IIFEVariableNode.value.declarations[0].init.callee.id != null){
                                _name = IIFEVariableNode.value.declarations[0].init.callee.id.name;
                                }
                                let _ASTnode = IIFEVariableNode.value.declarations[0].init.callee;
                                let _start = {startline:callee.loc.start.line, startcolumn:callee.loc.start.column}
                                let _end = {endline:callee.loc.end.line, endcolumn:callee.loc.end.column}
                                let _IIFENode = this.getIIFEFunction(_start,_end);
                                let _funcDecl = new IIFEDeclaration(_name, _ASTnode, _IIFENode);
                                IIFEDeclarationNodes.push(_funcDecl);
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
                        if(IIFEDeclarationNode.value.expression.callee.id != 'undefined') {
                            let _name = 'Unnamed';
                            if(IIFEDeclarationNode.value.expression.callee.id != null){
                                _name = IIFEDeclarationNode.value.expression.callee.id.name;
                            }
                            let _ASTnode = IIFEDeclarationNode.value.expression.callee;
                            let _start = {startline:_ASTnode.loc.start.line, startcolumn:_ASTnode.loc.start.column}
                            let _end = {endline:_ASTnode.loc.end.line, endcolumn:_ASTnode.loc.end.column}
                            let _IIFENode = this.getIIFEFunction(_start,_end);
                            let _funcDecl = new IIFEDeclaration(_name, _ASTnode, _IIFENode);
                            IIFEDeclarationNodes.push(_funcDecl);
                        }
                    }
                }        
            });
    }


}

module.exports = IIFEDeclarationFinder;
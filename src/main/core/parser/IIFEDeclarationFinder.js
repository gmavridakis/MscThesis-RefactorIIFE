const j = require('./JSCodeshiftWrapper.js').j;
const IIFEDeclaration = require('../model/IIFEDeclaration');
let IIFEDeclarationNodes = [];
const IIFE_DECLARATION_QUERY = {target: j.ExpressionStatement};
const IIFE_VARIABLE_QUERY = {target: j.VariableDeclaration};

/*  ---- Constants used in .filter START ----   */
    
    const isIIFESimplestForm = function(IIFEDeclarationNode){
        /* Simplest form of IIFE */
        let _astNode = IIFEDeclarationNode.value.expression.callee;
        if ( IIFEDeclarationNode.value.expression.type == 'CallExpression'){
            if(_astNode.type == 'FunctionExpression'){
                if(_astNode.id != 'undefined') {
                    return _astNode
                }
            }
        }
    };

    const isIIFEVariableDeclaration = function(IIFEVariableNode){
        /* IIFE Assigned to variable case */
        if(IIFEVariableNode.value.declarations[0].init !== null && IIFEVariableNode.value.declarations[0].init.callee !== undefined){
            let _astNode = IIFEVariableNode.value.declarations[0].init.callee;
            if(_astNode.type === 'FunctionExpression'){
                return _astNode
            }      
        } 
    };
    
    const isIIFEVariationArrowFunction = function(IIFEDeclarationNode){
        if(IIFEDeclarationNode.value.expression!=undefined){
            if(IIFEDeclarationNode.value.expression.callee){
                let _astNode = IIFEDeclarationNode.value.expression.callee;
                /* Arrow Function IIFE Variation  */
                if(_astNode.type === 'ArrowFunctionExpression'){
                    return _astNode
                }
            }
        }
    };

    const isIIFEVariationVoid = function(IIFEDeclarationNode){
        /* Void Variation */
        let void_case = IIFEDeclarationNode.value.expression;
        if( void_case.type == 'UnaryExpression' && void_case.operator == 'void'){
            if(void_case.argument.callee){
                return void_case.argument.callee
            }
        }
    };
/*  ---- Constants used in .filter END ----*/

class IIFEDeclarationFinder {

    constructor() {}
    

    /**
     * Returns an array of IIFEDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getIIFEDeclarations(rootNode) {
        //find all IIFEDeclaration AST nodes and push each of them to array
        this.submitInitialCode(rootNode);
        this.iifeSimplestForm(rootNode);      
        this.iifeVariableDeclaration(rootNode); 
        this.iifeVariationVoid(rootNode);
        this.iifeVariationArrowFunction(rootNode);
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
    static submitInitialCode(init){
        this.initCode = init.toSource();   
    }

    /* 
       Receives the IIFE as ASTNode , 
       extracts useful info like name ,
       push this info in array & create new IIFE Declaration object 
    */
    static pushNodesInfo(_astNode){
        let _name = 'Unnamed';
        if(_astNode.id != null){
            _name = _astNode.id.name;
        }
        let _start = {startline:_astNode.loc.start.line, startcolumn:_astNode.loc.start.column}
        let _end = {endline:_astNode.loc.end.line, endcolumn:_astNode.loc.end.column}
        let _iifeNode = this.getIIFEFunction(_start,_end);
        let _funcDecl = new IIFEDeclaration(_name, _astNode, _iifeNode);
        IIFEDeclarationNodes.push(_funcDecl);                
    }

    static iifeSimplestForm(rootNode){
        let res = rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFESimplestForm)
            .forEach(IIFEDeclarationNode => {
                let _astNode = IIFEDeclarationNode.value.expression.callee;
                this.pushNodesInfo(_astNode);        
            })
            .replaceWith('Here there was an IIFE (variation or simple form)')
            .toSource();
        // console.log('Results after iifeSimplestForm : ');
        // console.log(res);
    }

    static iifeVariableDeclaration(rootNode) {
        let res = rootNode
            .find(IIFE_VARIABLE_QUERY.target)
            .filter(isIIFEVariableDeclaration)
            .forEach(IIFEVariableNode => {
                /**
                 * Construct here the IIFEDeclaration instance
                 * possibly different constructor for each case ?
                 */
                let _astNode = IIFEVariableNode.value.declarations[0].init.callee;
                this.pushNodesInfo(_astNode);
            })
            .replaceWith('Here there was a variable declaration with IIFE')
            .toSource();
        // console.log('Results after iifeVariableDeclaration : ');
        // console.log(res);            
    }

    static iifeVariationVoid(rootNode) {
        let res = rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFEVariationVoid)
            .forEach(IIFEDeclarationNode => {
                let _astNode = IIFEDeclarationNode.value.expression.argument.callee;
                this.pushNodesInfo(_astNode);            
            })
            .replaceWith('Here there was an IIFE (variation void)')
            .toSource();
        // console.log('Results after iifeVariationVoid : ');
        // console.log(res);            
    }

    static iifeVariationArrowFunction(rootNode) {
        let res = rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFEVariationArrowFunction)
            .forEach(IIFEDeclarationNode => {
                let _astNode = IIFEDeclarationNode.value.expression.callee;
                this.pushNodesInfo(_astNode);
            })
            .replaceWith('Here there was an IIFE (variation arrow function)')
            .toSource();
        //console.log('Results after iifeVariationArrowFunction : ');
        console.log(res);            
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
}

module.exports = IIFEDeclarationFinder;
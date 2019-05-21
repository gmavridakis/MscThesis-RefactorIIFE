const j = require('./JSCodeshiftWrapper.js').j;
const IIFEDeclaration = require('../model/IIFEDeclaration');
//let IIFEDeclarationNodes = []; //array for testing purposes
const IIFE_DECLARATION_QUERY = {target: j.ExpressionStatement};
const IIFE_VARIABLE_QUERY = {target: j.VariableDeclaration};
let filepath;
/*  ---- Constants used in .filter START ----   */
    
    const isIIFESimplestForm = function(IIFEDeclarationNode){
        /* Simplest form of IIFE */
        let _astNode = IIFEDeclarationNode.value.expression.callee;
        if ( IIFEDeclarationNode.value.expression.type == 'CallExpression'){
            if(_astNode.type == 'FunctionExpression'){
                if(_astNode.id != 'undefined') {
                    return true
                }
            }
        }
        return false
    };

    const isIIFEVariableDeclaration = function(IIFEVariableNode){
        /* IIFE Assigned to variable case */
        let total_variable_declarators = IIFEVariableNode.value.declarations.length;
        if(total_variable_declarators == 1){
            if(IIFEVariableNode.value.declarations[0].init !== null && IIFEVariableNode.value.declarations[0].init.callee !== undefined){
                let _astNode = IIFEVariableNode.value.declarations[0].init.callee;
                if(_astNode.type === 'FunctionExpression' || _astNode.type === 'ArrowFunctionExpression'){
                    return true
                }      
            } 
        }
        else{
            for(let declarators_index=0;declarators_index<total_variable_declarators;declarators_index++){
                if(IIFEVariableNode.value.declarations[declarators_index].init !== null && IIFEVariableNode.value.declarations[declarators_index].init.callee !== undefined){
                    let _astNode = IIFEVariableNode.value.declarations[declarators_index].init.callee;
                    if(_astNode.type === 'FunctionExpression' || _astNode.type === 'ArrowFunctionExpression'){
                        return true
                    }      
                }                
            }
        }
        
        return false
    };
    
    const isIIFEAssignmentExpression = function(IIFEDeclarationNode){
        /* IIFE assigned */
        let _astNode = IIFEDeclarationNode.value.expression;
        if(_astNode.type === 'SequenceExpression'){
            let total = IIFEDeclarationNode.value.expression.expressions.length;
            for(let expression_index=0;expression_index<total;expression_index++){
                let expression = IIFEDeclarationNode.value.expression.expressions[expression_index];
                if ( expression.right != undefined){
                    if(expression.right.callee!=undefined){
                        if(expression.right.callee.type === 'FunctionExpression' || expression.right.callee.type === 'ArrowFunctionExpression'){
                            return true
                        }
                    }
                }
            }
        }
        if(_astNode.type === 'AssignmentExpression'){
            if ( _astNode.right != undefined){
                if(_astNode.right.callee!=undefined){
                    if(_astNode.right.callee.type === 'FunctionExpression'|| _astNode.right.callee.type === 'ArrowFunctionExpression'){
                        return true
                    }
                }
            }
        }
        
        return false
    };


    const isIIFEVariationArrowFunction = function(IIFEDeclarationNode){
        if(IIFEDeclarationNode.value.expression!=undefined){
            if(IIFEDeclarationNode.value.expression.callee){
                let _astNode = IIFEDeclarationNode.value.expression.callee;
                /* Arrow Function IIFE Variation  */
                if(_astNode.type === 'ArrowFunctionExpression'){
                    return true
                }
            }
        }
        return false
    };

    const isIIFEVariationVoid = function(IIFEDeclarationNode){
        /* Void Variation */
        let void_case = IIFEDeclarationNode.value.expression;
        if( void_case.type == 'UnaryExpression' && void_case.operator == 'void'){
            if(void_case.argument.callee){
                return true
            }
        }
        return false
    };
/*  ---- Constants used in .filter END ----*/

class IIFEDeclarationFinder {

    constructor() {}
    

    /**
     * Returns an array of IIFEDeclaration objects.
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static getIIFEDeclarations(rootNode,_filepath) {
        this.filepath = _filepath;
        //find all IIFEDeclaration AST nodes and update model
        this.submitInitialCode(rootNode);
        this.iifeSimplestForm(rootNode);      
        this.iifeVariableDeclaration(rootNode); 
        this.iifeVariationVoid(rootNode);
        this.iifeVariationArrowFunction(rootNode);
        this.iifeAssignmentExpression(rootNode);
    }

    /*
    static getIIFEDetails(){
        let $ = require("jquery");
        let arr = [];
        $.each( IIFEDeclarationNodes, function( index, value ){
            arr.push('Index : ' +index);
            arr.push('Name : ' +value);
        });
        return arr;
    }
    */
    
    static submitInitialCode(init){
        this.initCode = init.toSource();   
    }

    static pushNodesInfo(_initASTNode,_astFunctionNode){
        let _funcDecl = new IIFEDeclaration(_initASTNode, _astFunctionNode,this.filepath);
        //IIFEDeclarationNodes.push(_funcDecl);                
    }

    static iifeSimplestForm(rootNode){
        rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFESimplestForm)
            .forEach(IIFEDeclarationNode => {
                let _astFunctionNode = IIFEDeclarationNode.value.expression.callee;
                this.pushNodesInfo(IIFEDeclarationNode,_astFunctionNode);        
            })
    }
    static iifeAssignmentExpression(rootNode){
        rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFEAssignmentExpression)
            .forEach(IIFEDeclarationNode => {
                let _astFunctionNode;
                let _astNode = IIFEDeclarationNode.value.expression;
                if(_astNode.type === 'SequenceExpression'){
                    let total = IIFEDeclarationNode.value.expression.expressions.length;
                    for(let expression_index=0;expression_index<total;expression_index++){
                        let expression = IIFEDeclarationNode.value.expression.expressions[expression_index];
                        if(expression.right!=undefined){
                            if(expression.right.callee.type === 'FunctionExpression' || expression.right.callee.type === 'ArrowFunctionExpression'){
                                _astFunctionNode = expression.right.callee;
                            }
                        }
                                                        
                    }               
                }
                if(_astNode.type === 'AssignmentExpression'){
                    _astFunctionNode = _astNode.right.callee;
                }
                this.pushNodesInfo(IIFEDeclarationNode,_astFunctionNode);        

            })
    }

    static iifeVariableDeclaration(rootNode) {
        rootNode
            .find(IIFE_VARIABLE_QUERY.target)
            .filter(isIIFEVariableDeclaration)
            .forEach(IIFEVariableNode => {
                /**
                 * Construct here the IIFEDeclaration instance
                 * possibly different constructor for each case ?
                 */
                let _astFunctionNode;
                let total_variable_declarators = IIFEVariableNode.value.declarations.length;
                if(total_variable_declarators == 1){
                    _astFunctionNode = IIFEVariableNode.value.declarations[0].init.callee;
                    this.pushNodesInfo(IIFEVariableNode,_astFunctionNode);
                }
                else{
                    for(let declarators_index=0;declarators_index<total_variable_declarators;declarators_index++){
                        if(IIFEVariableNode.value.declarations[declarators_index].init !== null && IIFEVariableNode.value.declarations[declarators_index].init.callee !== undefined){
                            _astFunctionNode = IIFEVariableNode.value.declarations[declarators_index].init.callee;    
                            this.pushNodesInfo(IIFEVariableNode,_astFunctionNode);
                        }                
                    }
                }
            })         
    }

    static iifeVariationVoid(rootNode) {
        rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFEVariationVoid)
            .forEach(IIFEDeclarationNode => {
                let _astFunctionNode = IIFEDeclarationNode.value.expression;
                this.pushNodesInfo(IIFEDeclarationNode,_astFunctionNode);            
            })       
    }

    static iifeVariationArrowFunction(rootNode) {
        rootNode
            .find(IIFE_DECLARATION_QUERY.target)
            .filter(isIIFEVariationArrowFunction)
            .forEach(IIFEDeclarationNode => {
                let _astFunctionNode = IIFEDeclarationNode.value.expression.callee;
                this.pushNodesInfo(IIFEDeclarationNode,_astFunctionNode);
            });
            //.replaceWith('Here there was an IIFE (variation arrow function)')
            //.toSource();
    }    
}

module.exports = IIFEDeclarationFinder;
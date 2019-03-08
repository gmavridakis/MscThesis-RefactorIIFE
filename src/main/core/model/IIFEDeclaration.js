const FunctionDeclaration = require('../../../main/core/model/FunctionDeclaration');
class IIFEDeclaration {

    constructor(initASTNode, functionNode, filePath) {
        this.initASTNode = initASTNode;
        this.functionDeclaration = new FunctionDeclaration(functionNode);
        this.filePath = filePath;
        
        console.log(this.startLocation());
        //console.log(this.endLocation());
        //console.log(this.hasReturnValue());
        //console.log(this.getDetailsReturnValue());
        //console.log(this.getType());
        //console.log(this.getActualParameterDetails());
    }

    /**
     * Can we have more than one constructors ?
     * Then one constructor for each case
     */


     /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return {startline:this.initASTNode.value.loc.start.line, startcolumn:this.initASTNode.value.loc.start.column};
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return {endline:this.initASTNode.value.loc.end.line, endcolumn:this.initASTNode.value.loc.end.column};
    }
    
    getinitASTNode(){
        return this.initASTNode;
    }

    getFunctionDeclaration(){
        return this.functionDeclaration;
    }

    /* Returns an object with the total counts and an array with the arguments */
    getActualParameterDetails(){
        let type = this.getType();
        let count = -1;
        let details = [];
        let results = {};
        if(type === 'ExpressionStatement_CallExpression' ){
            if(this.initASTNode.value.expression.arguments!=undefined){
                count = this.initASTNode.value.expression.arguments.length;
                if(count>0){
                    details.push(this.initASTNode.value.expression.arguments);
                }
            }
        }
        if(type === 'ExpressionStatement_AssignmentExpression' ){
            count = this.initASTNode.value.expression.right.arguments.length;
            if(count>0){
                details.push(this.initASTNode.value.expression.right.arguments);
            }
        }

        if(type === 'ExpressionStatement_SequenceExpression' ){
            let total = this.initASTNode.value.expression.expressions.length;
            for(let expression_index=0;expression_index<total;expression_index++){
                let expression = this.initASTNode.value.expression.expressions[expression_index];
                if(expression.right!=undefined){
                    if(expression.right.callee.type === 'FunctionExpression'){
                        count =  expression.right.arguments.length;
                        if(count>0){
                            details.push(expression.right.arguments);
                        }
                    }
                }

            }
        }        

        if(type === 'ExpressionStatement_UnaryExpression' ){
            count = this.initASTNode.value.expression.argument.arguments.length;
            if(count>0){
                details.push(this.initASTNode.value.expression.argument.arguments);
            }
        }
        if(type === 'VariableDeclaration'){
            let _declarations = this.initASTNode.value;
            if(_declarations.declarations.length===1){
                if(_declarations.declarations[0].init!=undefined){
                    count = _declarations.declarations[0].init.arguments.length;
                    if(count>0){
                        details.push(_declarations.declarations[0].init.arguments);
                    }
                }
            }
        }
        results = {'total counts' : count , ' paramaters : ' : details };
        return results;
    }


    getType(){ /* ExpressionStatement_CallExpression ,ExpressionStatement_AssignmentExpression , VariableDeclarator ,   */
        let node = this.initASTNode.value;
        if( node.type === 'VariableDeclaration'){
            return 'VariableDeclaration';
        }
        if(node.type==='ExpressionStatement'){
            console.log(node.expression.type);
            if(node.expression.type === 'AssignmentExpression'){
                return 'ExpressionStatement_AssignmentExpression';
            }
            else if(node.expression.type === 'SequenceExpression'){
                return 'ExpressionStatement_SequenceExpression';
            }
            else if(node.expression.type === 'CallExpression'){           
                return 'ExpressionStatement_CallExpression';
            }
            else if (node.expression.type === 'UnaryExpression'){
                return 'ExpressionStatement_UnaryExpression';
            }
            else{
                return 'ExpressionStatement_' +node.expression.type;
            }
        }
        return 'Type_' +node.type;
    }

    hasReturnValue(){
        if(  this.getType() === 'ExpressionStatement_AssignmentExpression' 
            || this.getType() === 'ExpressionStatement_SequenceExpression'        
            || this.getType() === 'VariableDeclaration'
        ){
            return true; /* if the return value is assigned or used somewhere */
        }
        return false;
    }

    getDetailsReturnValue(){
        let return_identifier_details = {};
        if(this.hasReturnValue()){
            if(this.getType() === 'ExpressionStatement_AssignmentExpression'){
                let identifier = this.initASTNode.value.expression.left;
                return_identifier_details = { 
                    'name : ' : identifier.name , 
                    'start_line : ' : identifier.loc.start.line,
                    'start_column : ' : identifier.loc.start.column,
                    'end_line : ' : identifier.loc.end.line,
                    'end_column : ' : identifier.loc.end.column
                }
            }
        }
        else{
            return_identifier_details = 'No return value was identified';
        }
        return return_identifier_details;
    }

    print(){
        console.log("");
    }

}

module.exports = IIFEDeclaration;
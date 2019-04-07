const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
let statementList = [];

class FunctionDeclaration {

    // jscodeshift

    constructor(functionASTNode) {
        this.functionASTNode = functionASTNode;
        FunctionDeclarationCollection.addFunctionInCollectionArray(functionASTNode); //add node in init Function Collection
        /**
         * iterate over body of functionDeclaration and create an object for each statement
         */
        this.statementList = null;
        // console.log(this.getFunctionName());
        // console.log(this.getFunctionType());
        // console.log(this.startLocation());
        // console.log(this.endLocation());
        // console.log(this.getTypicalParameterCount());
        // console.log('Return of void : ' +this.isVoid());

        /* find return statement */
        /*
        jscodeshift(this.functionASTNode).find(...)
        */
    }

     /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */

    getFunction(){
        return this.functionASTNode;
    }

    startLocation() {
        return {startline:this.functionASTNode.loc.start.line, startcolumn:this.functionASTNode.loc.start.column};
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return {endline:this.functionASTNode.loc.end.line, endcolumn:this.functionASTNode.loc.end.column};
    }


    getTypicalParameterCount(){
        let total_params = 0;
        if(this.functionASTNode.params){
            total_params = (this.functionASTNode.params).length
        }
        return total_params;
    }

    /* returns function name , '-' if unnamed */
    getFunctionName(){
        let function_name = '-';
        if(this.functionASTNode.id!= null){
            function_name = this.functionASTNode.id.name;
        }
        if(this.functionASTNode.type === 'ArrowFunctionExpression'){
            function_name = 'ArrowFunction';
        }
        if(this.isVoid()){
            let _callee = this.functionASTNode.argument.callee;
            if(_callee.id!=null){
                function_name = _callee.id.name;
            }
        }        
        return function_name;
    }

    /* returns function type : NAMED, UNNAMED, ARROW */
    getFunctionType(){ 
        let function_type;
        if(this.getFunctionName() === '-'){
            function_type = 'UNNAMED';
        }
        else if(this.getFunctionName() === 'ArrowFunction'){
            function_type = 'ARROW';
        }
        else{
            function_type = 'NAMED';
        }
        return function_type; 
    }

    isVoid(){
        if(this.functionASTNode.operator==='void'){
            return true;
        }
        return false;
    }

    /* FunctionFinder will search for ReturnStatement */
    returnValue(_return){
        
    }

    /* FunctionFinder will crete an array of statements */
    setStatementList(_list){
        this.statementList = _list;
    }

    getStatementList(){
        return this.statementList;
    }

    
}

module.exports = FunctionDeclaration;
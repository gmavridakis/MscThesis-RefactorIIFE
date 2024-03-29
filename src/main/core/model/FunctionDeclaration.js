const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
const IIFEFunctionRefactor = require('../parser/FunctionToClassRefactor');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;

class FunctionDeclaration {

    // jscodeshift

    constructor(functionASTNode,file) {
        this.functionASTNode = functionASTNode;
        FunctionDeclarationCollection
            .addFunctionInCollectionArray(
                functionASTNode,
                this.getSource(),
                this.getES6Refactor(),
                this.getFunctionName(),
                this.getFunctionType(),
                this.getTypicalParameterCount(),
                this.startLocation(),
                this.endLocation(),
                file
            );
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
    
    getSource(){
        let j = require('../../core/parser/JSCodeshiftWrapper').j;
        return j(this.functionASTNode).toSource()
    }

    getES6Refactor(){
        try {
            let func = this.getSource()
            // console.log('*** Before : ***');
            // console.log(func);
            let nodesCollection = JSCodeshiftParser.parse(this.functionASTNode);
            let refactored_class = IIFEFunctionRefactor.classRefactor(nodesCollection);
            // console.log('*** After : ***');
            // console.log(refactored_class);                        
            return refactored_class            
        } catch (error) {
            console.log(error)
        }
    }
    getES6RefactorwithLebab(){
        let func = this.getSource()
        try {
            var lebab = require("lebab");
            let test = 'var f = function(){};'
            const {code, warnings} = 
                lebab.transform(test, ['let', 'arrow','arrow-return','for-of','for-each','multi-var','class','commonjs']);    
            return code;
        } catch (error) {
            console.log(error)
            
        }
        
        // const {code, warnings} = transform(
        //   'var f = function(a) { return a; };', // code to transform
        //   ['let', 'arrow', 'arrow-return'] // transforms to apply
        // );
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
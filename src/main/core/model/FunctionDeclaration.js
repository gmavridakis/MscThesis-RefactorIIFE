class FunctionDeclaration {



    // jscodeshift

    constructor(functionName, functionASTNode) {
        this.functionName = functionName;
        this.functionASTNode = functionASTNode;
        /**
         * iterate over body of functionDeclaration and create an object for each statement
         */
        this.statementList = null;

        /* find return statement */
        /*
        jscodeshift(this.functionASTNode).find(...)
        */
    }

    /**
     * Returns the start position of the function declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return this.functionASTNode.value.loc.start;
    }

    /**
     * Returns the end position of the function declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return this.functionASTNode.value.loc.end;
    }


    getTypicalParameterCount(){
        return -1;
    }

    getFunctionName(){
        return null;
    }

    getFunctionType(){
        return ""; /* NAMED, UNNAMED, ARROW */
    }

    isVoid(){
        return false; /* */
    }

    getStatementList(){
        return this.statementList;
    }

    
}

module.exports = FunctionDeclaration;
class IIFEDeclaration {

    constructor(IIFEName, IIFEASTNode, IIFENode, filePath) {
        this.IIFEName = IIFEName;
        this.IIFEASTNode = IIFEASTNode;
        this.IIFENode = IIFENode;
        this.functionDeclaration = null; /* new FunctionDeclaration(...) */
        this.filePath = filePath;

    }

    /**
     * Can we have more than one constructors ?
     * Then one constructor for each case
     */

    getIIFENode(){
        return this.IIFEASTNode;
    }

    getIIFEName(){
        return this.IIFEName;
    }

    getIIFEASTNode(){
        return this.IIFEASTNode;
    }


     /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return {startline:this.IIFEASTNode.loc.start.line, startcolumn:this.IIFEASTNode.loc.start.column};
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return {endline:this.IIFEASTNode.loc.end.line, endcolumn:this.IIFEASTNode.loc.end.column};
    }

    getFunctionDeclaration(){
        return this.functionDeclaration;
    }

    getActualParameterCount(){
        return -1;
    }

    hasReturnValue(){
        return true; /* if the return value is assigned or used somewhere */
    }

    print(){
        console.log("");
    }
    

}

module.exports = IIFEDeclaration;
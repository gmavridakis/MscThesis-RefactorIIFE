class FunctionDeclaration {

    constructor(functionName, functionASTNode) {
        this.functionName = functionName;
        this.functionASTNode = functionASTNode;
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

}

module.exports = FunctionDeclaration;
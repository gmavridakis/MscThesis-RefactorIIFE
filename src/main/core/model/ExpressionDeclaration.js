class ExpressionDeclaration {

    constructor(expressionName, expressionASTNode) {
        this.expressionName = expressionName;
        this.expressionASTNode = expressionASTNode;
    }

    /**
     * Returns the start position of the function declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return this.expressionASTNode.value.loc.start;
    }

    /**
     * Returns the end position of the function declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return this.expressionASTNode.value.loc.end;
    }

}

module.exports = ExpressionDeclaration;
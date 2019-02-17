class VariableDeclaration {

    constructor(variableName, variableASTNode) {
        this.variableName = variableName;
        this.variableASTNode = variableASTNode;
    }

    /**
     * Returns the start position of the function declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return this.variableASTNode.value.loc.start;
    }

    /**
     * Returns the end position of the function declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return this.variableASTNode.value.loc.end;
    }

}

module.exports = VariableDeclaration;
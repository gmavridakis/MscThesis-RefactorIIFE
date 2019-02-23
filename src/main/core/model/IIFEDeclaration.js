class IIFEDeclaration {

    constructor(IIFEName, IIFEASTNode) {
        this.IIFEName = IIFEName;
        this.IIFEASTNode = IIFEASTNode;
    }

    /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return this.IIFEASTNode.value.loc.start;
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return this.IIFEASTNode.value.loc.end;
    }

}

module.exports = IIFEDeclaration;
class IIFEDeclaration {

    constructor(IIFEName, IIFEASTNode, IIFENode) {
        this.IIFEName = IIFEName;
        this.IIFEASTNode = IIFEASTNode;
        this.IIFENode = IIFENode;
    }

    /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */

    getIIFENode(){
        return this.IIFENode;
    }

    getIIFEName(){
        return this.IIFEName;
    }

    getIIFEASTNode(){
        return this.IIFEASTNode;
    }

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

}

module.exports = IIFEDeclaration;
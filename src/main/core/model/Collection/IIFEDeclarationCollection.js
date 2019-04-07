let IIFEArray = [];

class IIFEDeclarationCollection{
    constructor() {
        // let _IIFEDeclaration = new IIFEDeclaration();
        // _IIFEDeclaration.call(this);
        // IIFEDeclarationCollection.prototype = Object.create(IIFEDeclaration.prototype);
        // IIFEDeclarationCollection.prototype.constructor = IIFEDeclarationCollection;
    }
    
    static addIIFEInCollectionArray(iife){
        IIFEArray.push(iife);
    }

    static getIIFEInCollectionArray(){
        return IIFEArray;
    }
}



module.exports = IIFEDeclarationCollection;
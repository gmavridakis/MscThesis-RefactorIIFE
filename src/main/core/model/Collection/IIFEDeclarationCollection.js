let IIFEArray = [];

class IIFEDeclarationCollection{
    constructor() {
        // let _IIFEDeclaration = new IIFEDeclaration();
        // _IIFEDeclaration.call(this);
        // IIFEDeclarationCollection.prototype = Object.create(IIFEDeclaration.prototype);
        // IIFEDeclarationCollection.prototype.constructor = IIFEDeclarationCollection;
    }
    
    static addIIFEInCollectionArray(iife,path,params,returns,start,end){
        let iife_obj = {
            "IIFE" : iife,
            "PATH" : path,
            "ACTUAL_PARAMETERS" : params,
            "RETURN_DETAILS" : returns,
            "START" : start,
            "END" : end
        }
        IIFEArray.push(iife_obj);
    }

    static getIIFEInCollectionArray(){
        return IIFEArray;
    }
}



module.exports = IIFEDeclarationCollection;
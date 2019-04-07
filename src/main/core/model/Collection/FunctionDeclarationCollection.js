let FunctionArray = [];

class FunctionDeclarationCollection{
    constructor() {
    }
    
    static addFunctionInCollectionArray(func){
        FunctionArray.push(func);
    }

    static getFunctionsInCollectionArray(){
        return FunctionArray;
    }
}



module.exports = FunctionDeclarationCollection;
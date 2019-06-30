let FunctionArray = [];

class FunctionDeclarationCollection{
    constructor() {
    }
    
    static addFunctionInCollectionArray(func,es6func,name,type,params,start,end){
        let func_obj = {
            "FUNCTION" : func,
            "ES6_REFACTORED" : es6func,
            "NAME" : name,
            "TYPE" : type,
            "TYPICAL_PARAMETERS" : params,
            "START" : start,
            "END" : end            
        }       
        FunctionArray.push(func_obj);
    }

    static getFunctionsInCollectionArray(){
        return FunctionArray;
    }
}



module.exports = FunctionDeclarationCollection;
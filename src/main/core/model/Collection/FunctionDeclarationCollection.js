let FunctionArray = [];

class FunctionDeclarationCollection{
    constructor() {
    }
    
    static addFunctionInCollectionArray(func,unrefactored,es6func,name,type,params,start,end,path){
        let func_obj = {
            "FUNCTION" : func,
            "UNREFACTORED_SOURCE" : unrefactored,
            "ES6_REFACTORED" : es6func.REFACTORED,
            "CAN_BE_REFACTORED" : es6func.CAN_BE_REFACTORED,
            "NAME" : name,
            "TYPE" : type,
            "TYPICAL_PARAMETERS" : params,
            "START" : start,
            "END" : end,
            "PATH" : path         
        }       
        FunctionArray.push(func_obj);
    }

    static getFunctionsInCollectionArray(){
        return FunctionArray;
    }
}



module.exports = FunctionDeclarationCollection;
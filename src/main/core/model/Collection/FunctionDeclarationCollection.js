let FunctionArray = [];

class FunctionDeclarationCollection{
    constructor() {
    }
    
    static addFunctionInCollectionArray(func,unrefactored,es6func,name,type,params,start,end,path){        
        let current_path = path
        let file_name = 'refactored_'+current_path.substring(current_path.lastIndexOf("/")+1,current_path.length);
        let _IMPORT = 'import '+es6func.CLASS_NAME +' from \'./'+file_name +'\' ';
        let _REF_IMPORT = '(function(){' +es6func.CLASS_NAME +'})();'
        let func_obj = {
            "FUNCTION" : func,
            "UNREFACTORED_SOURCE" : unrefactored,
            "REFACTORED_EXPORT" : es6func.REFACTORED_EXPORT,
            "REFACTORED_IMPORT" : _REF_IMPORT,
            "IMPORT" : _IMPORT,
            "CAN_BE_REFACTORED" : es6func.CAN_BE_REFACTORED,
            "CLASS_NAME" : es6func.CLASS_NAME,
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
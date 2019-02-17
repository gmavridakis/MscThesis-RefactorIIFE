const FunctionDeclaration = require('../FunctionDeclaration');

class FunctionDeclarationCollection{

    static getDeclarationCollection(){
        FunctionDeclaration.call(this);
        FunctionDeclarationCollection.prototype = Object.create(FunctionDeclaration.prototype);
        FunctionDeclarationCollection.prototype.constructor = FunctionDeclarationCollection;
    }
}

module.exports = FunctionDeclarationCollection;
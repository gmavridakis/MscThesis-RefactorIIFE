const j = require('./JSCodeshiftWrapper.js').j;

const FUNCTION_QUERY = {
    target: j.FunctionDeclaration, 
    id: {
        type: "Identifier"
    }
};

// Store class paths, used to push methods after class creation
let classPaths = {};

class FunctionToClassRefactor {

    constructor() {}
    
    /**
     * Refactor functions to ES6 Classes
     * @param rootNode the root node of the code as returned from jscodeshift
     * @returns {Array}
     */
    static classRefactor(rootNode) {
        //find all IIFEDeclaration AST nodes and update model
        this.submitInitialCode(rootNode);
        this.identifyFunctions(rootNode);   
        //this.showPaths();   
    }

    static submitInitialCode(init){
        this.initCode = init.toSource();   
    }

    static showPaths(){
        console.log('Paths : ');
        console.log(classPaths);
    }

    static createMethodDefinition(j, kind, key, path, isStatic = false) {
        // console.log('---1---');
        // console.log(j);
        // console.log('---2---');
        // console.log(kind);
        // console.log('---3---');
        // console.log(key);
        // console.log('---4---');
        // console.log(path);
        return j.methodDefinition(
          kind,
          key,
          j.functionExpression(null, path.params, path.body),
          isStatic
        );
    }

    static identifyFunctions(rootNode){
        console.log('Before : ');
        console.log(rootNode.toSource());
        console.log('After : ');
        let res = rootNode
            .find(FUNCTION_QUERY.target)
            .forEach(path => {
                let _class = j.classDeclaration(
                    path.value.id,
                    j.classBody([
                        this.createMethodDefinition(
                            j,
                            "method",
                            j.identifier("constructor"),
                            path.value
                        )
                    ])
                    // 3rd param => superClass support
                )
                j(path).replaceWith(
                    _class
                );
            })
            .toSource();
        console.log(res);
    }    
}

module.exports = FunctionToClassRefactor;
const j = require('./JSCodeshiftWrapper.js').j;
const EXPRESSION_QUERY = {target: j.ExpressionStatement};
const VARIABLE_QUERY = {target: j.VariableDeclaration};
let globalVariableIndexer = [];

/*  ---- Constants used in .filter START ----   */
const isUnamedRequire = function(node){
    let _astNode = node.value.expression.callee;
    return _astNode ? _astNode.name == 'require' ? true : false : false
};

const isNamedExpressionRequire = function(node){
    let _astNode = node.value.expression.right;
    return _astNode ? _astNode.callee.name == 'require' ? true : false : false
};

const isNamedVariableRequire = function(node){
    let _astNode = node.value.declarations;
    for(let i=0;i<_astNode.length;i++){
        let _astNode = node.value.declarations[i];
        return _astNode.init.callee ? _astNode.init.callee.name == 'require' ? true : false : false
    }
    //return _astNode ? _astNode.callee.name == 'require' ? true : false : false
};

/*  ---- Constants used in .filter END ----*/

class GlobalVariableFinder {

    constructor() {}

    static getGlobalVariables(rootNode) {
        this.identifyVariableRequires(rootNode);
        this.identifyExpressionVariableRequires(rootNode);
        this.identifyUnamedRequires(rootNode);
        return globalVariableIndexer;
    }

    static updateIndexer(obj){
        globalVariableIndexer.push(obj);
    }
    static getSource(node){
        return j(node).toSource()
    }
    /*
        *   1. var _ = require('underscore'), $;
        *   2. var Promise = require('../../js/release/bluebird.js');
    */   
   
    static identifyVariableRequires(rootNode){
        rootNode
            .find(VARIABLE_QUERY.target)
            .filter(isNamedVariableRequire)
            .forEach(declarationNode => {
                let _astNode = declarationNode.value.declarations;
                let obj;
                for(let i=0;i<_astNode.length;i++){
                    let _astNode = declarationNode.value.declarations[i];
                    if(_astNode.init){
                        if(_astNode.init.callee){
                            if(_astNode.init.callee.name == 'require'){
                                obj = {
                                    name : _astNode.id.name,
                                    expression : this.getSource(declarationNode),
                                    type : 'require' 
                                }
                                this.updateIndexer(obj);
                            }
                        }
                    }
                }
            })
    }
    /*
        *   $ = require('jquery');
    */     
    static identifyExpressionVariableRequires(rootNode){
        rootNode
            .find(EXPRESSION_QUERY.target)
            .filter(isNamedExpressionRequire)
            .forEach(expressionNode => {
                let obj = {
                    name : expressionNode.value.expression.left.name,
                    expression : this.getSource(expressionNode),
                    type : 'require' 
                }
                this.updateIndexer(obj);
            })
    }  

    /*
        *   require('../lib/fakesP');
    */    
    static identifyUnamedRequires(rootNode){
        rootNode
            .find(EXPRESSION_QUERY.target)
            .filter(isUnamedRequire)
            .forEach(expressionNode => {
                let obj = {
                    name : '-',
                    expression : this.getSource(expressionNode),
                    type : 'require' 
                }
                this.updateIndexer(obj);
            })
    }   
 


    /*
    * Example of identification of variables with Tern outside of functions!
    */
    static TernVariableIdentifier(initCode,path){
        var tern = require("tern")
        var estraverse = require("estraverse")
        var ternServer = new tern.Server({})
        var identifierPositions = []
        ternServer.on("postParse", function(ast){
            estraverse.traverse(ast, {
                enter: function (node, parent) {
                    if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration')
                        return estraverse.VisitorOption.Skip;
                },
                leave: function (node, parent) {
                    console.log(node.type);
                    if (node.type == 'Identifier'){
                        identifierPositions.push(node);
                    }
                }
            })
        })

        ternServer.addFile(path, initCode)

        let counter=0;
        identifierPositions.forEach( (node) => {
            counter++;
            console.log('---------');
            console.log(counter +'.');
            console.log('identifierName : ');
            console.log(node.name);                    
            var requestDetails = {
                query: {
                    type: "definition",
                    file: path,
                    end: node.end
                }
            }
            ternServer.request(requestDetails, function(error, success){
                console.log('TernInfo : ');
                console.log(success);                            
            })  
            console.log('---------');                  
        })        
    }

}

module.exports = GlobalVariableFinder;
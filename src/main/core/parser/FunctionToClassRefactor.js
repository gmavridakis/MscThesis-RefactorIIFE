const j = require('./JSCodeshiftWrapper.js').j;
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
        let refactored = this.identifyFunctions(rootNode);   
        return refactored;
    }


    static identifyFunctions(root){

        // Store class paths, used to push methods after class creation
        let classPaths = {};
        let can_be_refactored = false
        let className = ""
        let _class
        function createMethodDefinition(j, kind, key, path, isStatic = false) {
          return j.methodDefinition(
            kind,
            key,
            j.functionExpression(null, path.params, path.body),
            isStatic
          );
        }
      
        /*
          Transform to create Class
        */
        root
          .find(j.FunctionDeclaration, {
            id: {
              type: "Identifier"
            }
          })
          .forEach(path => {
            j(path).replaceWith(
              j.classDeclaration(
                path.value.id,
                j.classBody([
                  createMethodDefinition(
                    j,
                    "method",
                    j.identifier("constructor"),
                    path.value
                  )
                ])
                // 3rd param => superClass support
              )
            );
      
            // Store path for future ref to insert methods
            classPaths[path.value.id.name] = path;
            className = path.value.id.name
          });
      
        /*
          Transform prototype variables into class constructor
        */
        root
          .find(j.ExpressionStatement, {
            expression: {
              left: {
                type: "MemberExpression",
                object: {
                  property: {
                    name: "prototype"
                  }
                }
              },
              right: {
                type: "Literal"
              }
            }
          })
          .forEach(path => {
            can_be_refactored = true
            const { name: className } = path.value.expression.left.object.object;
            const { name: memberName } = path.value.expression.left.property;
            const { value: memberValue } = path.value.expression.right;
            // Fetch previously stored class path to find constructor
            const classPath = classPaths[className];
            j(classPath)
              .find(j.MethodDefinition, {
                key: {
                  type: "Identifier",
                  name: "constructor"
                }
              })
              .forEach(path => {
                const { body: constructorBody } = path.value.value.body;
                constructorBody.push(
                  j.expressionStatement(
                    j.assignmentExpression(
                      "=",
                      j.memberExpression(
                        j.thisExpression(),
                        j.identifier(memberName)
                      ),
                      j.literal(memberValue)
                    )
                  )
                );
              });
            j(path).remove();
          });
      
        /*
          Adds/pushes method/function at a given path to class
        */
        function addMethodToClass(path, isStatic) {
          const { name: className } = isStatic
            ? path.value.left.object
            : path.value.left.object.object;
          // Fetch previously stored class path to insert methods
          const classPath = classPaths[className];
          const { property: methodName } = path.value.left;
          const { body: classBody } = classPath.value.body;
          classBody.push(
            createMethodDefinition(
              j,
              "method",
              methodName,
              path.value.right,
              isStatic ? true : false
            )
          );
          j(path).remove();
        }
      
        /*
          Transform to create class methods based on "prototype"
        */
        root
          .find(j.AssignmentExpression, {
            left: {
              type: "MemberExpression",
              object: {
                property: {
                  name: "prototype"
                }
              }
            },
            right: {
              type: "FunctionExpression"
            }
          })
          .forEach(path => addMethodToClass(path, false));
      
        /*
          Transform to create "static" class methods
        */
        root
          .find(j.AssignmentExpression, {
            left: {
              type: "MemberExpression",
              property: {
                type: "Identifier"
              }
            },
            right: {
              type: "FunctionExpression"
            }
          })
          .forEach(path => addMethodToClass(path, true));
      
        /*
          Transform for getters, setters
        */
        root
          .find(j.CallExpression, {
            callee: {
              type: "MemberExpression",
              object: {
                type: "Identifier",
                name: "Object"
              },
              property: {
                type: "Identifier",
                name: "defineProperty"
              }
            }
          })
          .forEach(path => {
            const { name: className } = path.value.arguments[0].object;
            // Fetch previously stored class path to insert methods
            const classPath = classPaths[className];
            const { body: classBody } = classPath.value.body;
            const { value: methodName } = path.value.arguments[1];
            const { properties } = path.value.arguments[2];
      
            properties.forEach(property => {
              // Type of method => (get || set)
              const { name: type } = property.key;
              classBody.push(
                createMethodDefinition(
                  j,
                  type,
                  j.identifier(methodName),
                  property.value
                )
              );
            });
      
            j(path).remove();
          });
          
          // PRE - CONDITIONS
          if(className!=""){
            root
            .find(j.ExpressionStatement, {
              expression: {
                left: {
                  type: "MemberExpression",
                  object: {
                    object: {
                      name : className
                    },
                    property: {
                      name: "prototype"
                    }
                  }
                },
                right: {
                  type: "Literal"
                }
              }
            })
            .forEach(path => {
              can_be_refactored = true
            });            
          }

          if(root.__paths[0].value.body.body[0].type == 'ClassDeclaration'){
            _class = root.__paths[0].value.body.body[0]
            _class = 'export ' +j(_class).toSource()
          }
          else{
            console.log('refactor error')
            can_be_refactored = false
          }

          let res = {
            "REFACTORED_EXPORT" : _class,
            "CAN_BE_REFACTORED" : can_be_refactored,
            "CLASS_NAME" : can_be_refactored ? className : "" 
          }
        return res;
    }
}

module.exports = FunctionToClassRefactor;
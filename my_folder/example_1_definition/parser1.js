export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const IIFE_Identifier_1 = root
    .find(j.ExpressionStatement)
    .forEach(function(path) {
      if (path.value.expression.callee.type === "FunctionExpression") {
        console.log("Output Result - A new node was found ! ");
        console.log("Output Result : Start at " + path.value.start);
        console.log("Output Result : End at " + path.value.end);
        console.log("Output Result : Node Details : ");
        console.log(path.value);
        //return path.value;
      }
    });
  //IIFE_Identifier_1 ? IIFE_Identifier_1.toSource() : null
}
import {refactored_es6_1} from './export_test_function_es6';	
import {refactored_es6_2} from './export_test_body_function_es6 '	
import {refactored_es6_3} from './export_test_body_function_es6_without_return'	

var obj = require('./export_test').obj;	
var obj2 = ( refactored_es6_1() )();	
var obj3 = ( function(){ return refactored_es6_2() } )();	
(function(){	
    return refactored_es6_3()	
})();	

 import './export_test_es6_side_effect'	

 var add = require('./export_test').add;	
var add2 = (require('./export_test').unnamed2)();	
var func = ( require('./export_test').unnamed1 )();	
var func_named = ( require('./export_test').named )();	

import './export_test_es6_side_effect'

console.log(obj);	
console.log(obj2);	
console.log(obj3);	
console.log(add);	
console.log(add2);	
console.log(func);	
console.log(func_named);	

 //import {transform} from 'lebab';	
// const {code, warnings} = transform(	
//   'var f = function(a) { return a; };', // code to transform	
//   ['let', 'arrow', 'arrow-return'] // transforms to apply	
// );	
// console.log(code); // -> "const f = a => a;"
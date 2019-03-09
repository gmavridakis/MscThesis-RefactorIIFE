(function() { /* IIFE unnamed in simplest form */ })();

(function IIFE1(first, last,x = 0){
    /* IIFE1 in simplest form with parameters */
    console.log("My name is " + last + ", " + first + " " + last + ".");
    console.log('IIFE1 in simplest form');
}("James", "Bond"));

(function IIFE3(c,d){
    /* Variation with no question mark here at the end ... IIFE3! */
}(a,b))

var globalVar = "functionsExample";

( (a,b)=> { 
    /* Arrow Function IIFE Variation 1 */
})("mpampis","flu");

a = ( (a,b)=> { 
    /* Arrow Function IIFE Variation 2 */
    return 'return_statement';
})("mpampis","flu");

a,b = ( (a)=> { 
    /* Arrow Function IIFE Variation 3 */
    return 'return_statement';
})("mpampis");

let y;

y = (function IIFE2(){
    /*IIFE2 named assigned to variable y*/
    return '';
}());

a,b = (function(b,c) { /* IIFE sequential expression */ return 'return_statement!!!!' })('koukos','anoiksh');

let x;
x = x+1;
  
var x = (function() { /* IIFE unnamed assigned to variable */ })('testt');

var xx, yy = (function(){
    var test = 'test';
    /* IIFE unnamed assigned to variable yy */
    return test;
}('opa_opa','kardia_moy_isoropa'));

let a = ( (a,b)=> { 
    /* Arrow Function IIFE Variation 4 */
    return 'return_statement';
})("mpampis","flu");

let a,b = ( (a,b)=> { 
    /* Arrow Function IIFE Variation 5 */
    return 'return_statement';
})("mpampis","flu");

function outer() {

    this.outerVar = 5;
    
    (void function voidFuncVariation() {
        /* nested void Variation */
        console.log(x);
    }());

    function inner(value) {
        var z = (function IIFE4(a,b){
            /* nested IIFE4 assigned to variable z */
            x = function(a,b){}
            return 'return_statement';
        }('test'));
        console.log("value: " + value);
    }

    inner(this.outerVar);
}

var obj = {
    prop: "object's property"
};
var result = ( function() { 
    /* Variation of unnamed IIFE with transition of parenthesis! */
    return 'result';
}('testing'));


(void function voidnamed(x,y) {
    let x;
    let y;
    if(true){
      (function nestedlvl2() {
            let x;
            let y;
            if(true){
              (function netstedlvl3() {})();  	
            }
      })("James", "Bond");  	
    }
    /* Void Variation of IIFE */
    console.log('i am a void variation');
}());

(void function() {
    /* Void Variation unnamed of IIFE */
    console.log('i am a void variation');
}(t1,t2));

console.log(globalVar);
outer();
console.log(obj.prop);

(function() { /* IIFE unnamed in simplest form */ })();

(function IIFE1(){
    /* IIFE1 in simplest form */
    console.log('IIFE1 in simplest form');
    return '';
}());


var y = (function IIFE2(){
    /*IIFE2 named assigned to variable y*/}());

var yy = (function(){
    var test = 'test';
    /* IIFE unnamed assigned to variable yy */
    return test;
}());

let x;
x = x+1;

(function IIFE3(){
    /* Variation with no question mark here at the end ... IIFE3! */
}())

var globalVar = "functionsExample";

(void function test() {
    /* Void Variation of IIFE */
    console.log('i am a void variation');
}());
  
( ()=> { 
    /* Arrow Function IIFE Variation  */
    return 'Another variation!';
})();

function outer() {

    this.outerVar = 5;
    
    (void function voidFuncVariation() {
        /* nested void Variation */
        console.log(x);
    }());

    function inner(value) {
        var z = (function IIFE4(){
            /* nested IIFE4 assigned to variable z */
        }());
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
}());



console.log(globalVar);
outer();
console.log(obj.prop);

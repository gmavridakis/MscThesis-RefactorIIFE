(function() { /* IIFE unnamed in simplest form */ })();

(function IIFE1(first, last,x = 0){
    /* IIFE1 in simplest form with parameters */
    console.log("My name is " + last + ", " + first + " " + last + ".");
    console.log('IIFE1 in simplest form');
    return '';
}("James", "Bond"));

let y;
y = (function IIFE2(){
    /*IIFE2 named assigned to variable y*/}());

a,b = (function(b,c) { /* IIFE sequential expression */ })('koukos','anoiksh');

var xx, yy = (function(){
    var test = 'test';
    /* IIFE unnamed assigned to variable yy */
    return test;
}());

let x;
x = x+1;

(function IIFE3(c,d){
    /* Variation with no question mark here at the end ... IIFE3! */
}(a,b))

var globalVar = "functionsExample";

(void function() {
    /* Void Variation unnamed of IIFE */
    console.log('i am a void variation');
}(t1,t2));
  
( (a,b)=> { 
    /* Arrow Function IIFE Variation  */
    return 'Another variation!';
})("mpampis","flu");

function outer() {

    this.outerVar = 5;
    
    (void function voidFuncVariation() {
        /* nested void Variation */
        console.log(x);
    }());

    function inner(value) {
        var z = (function IIFE4(){
            /* nested IIFE4 assigned to variable z */
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
}());


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



console.log(globalVar);
outer();
console.log(obj.prop);

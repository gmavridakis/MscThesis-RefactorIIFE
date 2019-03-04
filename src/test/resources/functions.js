var l= (function() { /* do some stuff here varl */ return 'test';})();

(function() { /* do some stuff here unnamed without var*/ })();

(function IIFE1(){
    //IIFE1
    console.log('First IIFE expression!');
}());

var y = (function IIFE2(){
    //do some stuff var y IIFE 2
/**/}());

let x;
x = x+1;

(function IIFE3(){
    //No question mark here IIFE3!
}())

var globalVar = "functionsExample";

function outer() {

    this.outerVar = 5;

    function inner(value) {
        var z = (function IIFE4(){
            //do some stuff internal var z
        }());
        console.log("value: " + value);
    }

    inner(this.outerVar);
}

var obj = {

    prop: "object's property"
};



console.log(globalVar);
outer();
console.log(obj.prop);



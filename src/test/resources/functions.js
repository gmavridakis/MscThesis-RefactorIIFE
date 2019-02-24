(function IIFE1(){
    console.log('First IIFE expression!');
}());

var y = (function IIFE2(){
    //do some stuff
}());

let x;
x = x+1;

(function IIFE3(){
    //No question mark here!
}())

var globalVar = "functionsExample";

function outer() {

    this.outerVar = 5;

    function inner(value) {

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
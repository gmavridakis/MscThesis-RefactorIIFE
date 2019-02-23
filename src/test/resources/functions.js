(function IIFE1(){
}());

var y = (function IIFE2(){
}());

let x;
x = x+1;

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
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
(function(first, last) {
    console.log("My name is " + last + ", " + first + " " + last + ".");
 
})("James", "Bond");

(function(x, y='hey 2') {
    console.log("My name is " + x + ", " + y + ".");
 
})();

(function() {
    console.log("My name is none!");
 
})("James", "Bond");


var result = function() {
    return "From IIFE!";
}();
console.log(result);
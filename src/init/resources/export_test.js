let obj = (function () {
    let obj = {
        "name" : "greg"
    }
    return obj;
})();

var add = (function (a,b) {
    let c = 5;
    return a+b+c;
})(1,2);

function unnamed1(){
    return 'mpampis'
}
function unnamed2() {
    let a = 1 , b = 2;
    let c = 5;
    return a+b+c;
}
function named(){
    return 'with a name now!'
}

module.exports.obj = obj;
module.exports.add = add;
module.exports.unnamed1 = unnamed1;
module.exports.unnamed2 = unnamed2;
module.exports.named = named;
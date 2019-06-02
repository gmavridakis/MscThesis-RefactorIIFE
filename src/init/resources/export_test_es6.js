/*
    Here is exported only the body of each function within IIFE
    Each IIFE is a different export file
    
    Init code :

    var obj = (function () {
        let obj = {
            "name" : "greg"
        }
        return obj;
    })();

*/

export function es6_body() {
    return function (){
        let obj = {
            "name" : "greg"
        }
        return obj;
    }
}
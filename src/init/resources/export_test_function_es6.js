/*
    Here is exported only the body of each function within IIFE
    Each IIFE is a different export file
    
    Init code :

    var obj = (function () {
        let obj = {
            "name1" : "greg"
        }
        return obj;
    })();

*/

export function refactored_es6_1() {
    return function (){
        let obj = {
            "name" : "greg"
        }
        return obj;
    }
}
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

export function refactored_es6_2() {
    let obj = {
        "name" : "greg"
    }
    return obj;
}
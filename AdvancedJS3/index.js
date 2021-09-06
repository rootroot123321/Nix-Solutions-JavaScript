"use strict";
function getAlign(str) {
    let [upper, lower] = [0, 0];
    for(let item of str){
        if(item.match(/[A-Z]/)) upper++;
        else lower++;
    }
    if(upper > lower)
        return str.toUpperCase();
    return str.toLowerCase();
}

console.log(getAlign('code'));
console.log(getAlign('CODe'));
console.log(getAlign('COde'));
console.log(getAlign('Code'));
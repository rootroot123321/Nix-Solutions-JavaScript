"use strict";
function misspelled(str1, str2) {
    let misspells = 0;
    const diff = str1.length - str2.length;
    if (Math.abs(diff) > 1) return false;
    else if (Math.abs(diff) === 1) {
        let [bigger, smaller] = diff > 0 ? [str1, str2] : [str2, str1];
        for (let i = 0, j = 0; i < bigger.length; i++, j++) {
            if (bigger[i] !== smaller[j]) {
                misspells++;
                j--;
            }
            if (misspells > 1) return false;
        }
    } else {
        for (let i = 0; i < str1.length; i++) {
            if(str1[i] !== str2[i]) misspells++;
            if(misspells > 1) return false;
        }
    }
    return misspells === 1;
}

console.log(misspelled('versed', 'xersed'));
console.log(misspelled('versed', 'applb'));
console.log(misspelled('versed', 'v5rsed'));
console.log(misspelled('1versed', 'versed'));
console.log(misspelled('versed', 'versed1'));
console.log(misspelled('versed', 'aversed'));
console.log(misspelled('aaversed', 'versed'));
console.log(misspelled('versed', 'aaversed'));
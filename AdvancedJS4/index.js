"use strict";
function getIndexesOfSum(arr, n) {
    for(const item1 of arr) {
        for(const item2 of arr) {
            if(item1 + item2 === n) {
                return [arr.indexOf(item1), arr.indexOf(item2)];
            }
        }
    }
    return [];
}

console.log(getIndexesOfSum([2, 7, 11, 15], 9));
console.log(getIndexesOfSum([12, 24, 34, 2], 14));
console.log(getIndexesOfSum([2, 7, 11, 15], 22));
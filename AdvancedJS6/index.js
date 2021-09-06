"use strict";

function truncateString(str, n) {
    let arr = str.split('');
    if(str.length > n)  arr.splice(n, str.length - n, '...');
    return arr.join('');
}

console.log(truncateString('Testing String', 3));
console.log(truncateString('Testing String', 8));
console.log(truncateString('Test', 8));
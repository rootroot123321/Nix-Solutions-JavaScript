"use strict";
function between(a, b) {
    let arrayBetweenNumbers = [];
    let i = 0, currentNumber = a;
    do arrayBetweenNumbers[i++] = currentNumber++;
    while(currentNumber <= b);
    return arrayBetweenNumbers;
}

console.log(between(1, 4));
console.log(between(-2, 2));
console.log(between(20, 25));
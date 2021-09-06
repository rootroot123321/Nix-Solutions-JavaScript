"use strict";
function divisibleByThree1(number) {
    return Number.isInteger(+number / 3);
}

function divisibleByThree2(number) {
    return Number.isInteger(number.split('').reduce((sum, digit) => sum + +digit, 0) / 3);
}

console.log(divisibleByThree1('123'));
console.log(divisibleByThree1('19254'));
console.log(divisibleByThree1('88'));
console.log(divisibleByThree1('1'));

console.log(divisibleByThree2('123'));
console.log(divisibleByThree2('19254'));
console.log(divisibleByThree2('88'));
console.log(divisibleByThree2('1'));
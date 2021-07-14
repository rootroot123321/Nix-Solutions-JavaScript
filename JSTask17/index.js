"use strict";
function divisibleByThree(number) {
    return Number.isInteger(+number / 3);
}
console.log(divisibleByThree('123'));
console.log(divisibleByThree('19254'));
console.log(divisibleByThree('88'));
console.log(divisibleByThree('1'));
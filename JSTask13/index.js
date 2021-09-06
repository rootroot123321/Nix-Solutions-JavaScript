"use strict";
function hexToDec1(hex) {
    let decimal = 0;
    for(let i = 0; i < hex.length; i++) {
        let sixteenPower =  16 ** (hex.length - 1 - i);
        switch(hex[i]) {
            case 'A':
            case 'a':
                decimal += 10 * sixteenPower;
                break;
            case 'B':
            case 'b':
                decimal += 11 * sixteenPower;
                break;
            case 'C':
            case 'c':
                decimal += 12 * sixteenPower;
                break;
            case 'D':
            case 'd':
                decimal += 13 * sixteenPower;
                break;
            case 'E':
            case 'e':
                decimal += 14 * sixteenPower;
                break;
            case 'F':
            case 'f':
                decimal += 15 * sixteenPower;
                break;
            case '-':
                break;
            default:
                decimal += +hex[i] * sixteenPower;
        }
    }
    return decimal;
}

function hexToDec2(hex) {
    return parseInt(hex.split('-').join(''), 16);
}

console.log(hexToDec1('1'));
console.log(hexToDec1('a'));
console.log(hexToDec1('10'));
console.log(hexToDec1('FF'));
console.log(hexToDec1('-C'));

console.log(hexToDec2('1'));
console.log(hexToDec2('a'));
console.log(hexToDec2('10'));
console.log(hexToDec2('FF'));
console.log(hexToDec2('-C'));

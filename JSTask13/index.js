"use strict";
function hexToDec(hex) {
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
console.log(hexToDec('1'));
console.log(hexToDec('a'));
console.log(hexToDec('10'));
console.log(hexToDec('FF'));
console.log(hexToDec('-C'));

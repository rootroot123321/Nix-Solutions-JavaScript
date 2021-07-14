"use strict";
function evensAndOdds(number) {
    if(number === 0)
        return number;
    if(number % 2 === 0) {
        let binary = '';
        while(number !== 1) {
            binary += number % 2;
            number =  Math.floor(number / 2);
        }
        binary += number;
        return binary.split('').reverse().join('');
    }
    else {
        let hex = '';
        while(number >= 16) {
            hex = toLetter(hex, number);
            number = Math.floor(number / 16);
        }
        hex = toLetter(hex, number);
        return hex.split('').reverse().join('');
    }
}
function toLetter(hex, number) {
    switch(number % 16)
    {
        case 10:
            hex += 'A';
            break;
        case 11:
            hex += 'B';
            break;
        case 12:
            hex += 'C';
            break;
        case 13:
            hex += 'D';
            break;
        case 14:
            hex += 'E';
            break;
        case 15:
            hex += 'F';
            break;
        default:
            hex += number % 16;
    }
    return hex;
}

console.log(evensAndOdds(456));
console.log(evensAndOdds(223));
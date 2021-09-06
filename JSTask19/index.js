"use strict";
function evensAndOdds1(number) {
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
            hex += 'a';
            break;
        case 11:
            hex += 'b';
            break;
        case 12:
            hex += 'c';
            break;
        case 13:
            hex += 'd';
            break;
        case 14:
            hex += 'e';
            break;
        case 15:
            hex += 'f';
            break;
        default:
            hex += number % 16;
    }
    return hex;
}

function evensAndOdds2(number) {
    if(number % 2 === 0) {
        return number.toString(2);
    }
    else {
        return number.toString(16);
    }
}

console.log(evensAndOdds1(456));
console.log(evensAndOdds1(223));

console.log(evensAndOdds2(456));
console.log(evensAndOdds2(223));
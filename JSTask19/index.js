"use strict";
function evensAndOdds(number) {
    if(number % 2 === 0) {
        let binary = '';
        do {
            binary += number % 2;
            number =  Math.floor(number / 2);
        } while(number !== 1);
        binary += number;
        return binary.split('').reverse().join('');
    }
    else {
        let hex = '';
        do {
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
            number = Math.floor(number / 16);
        } while(number >= 16);
        hex += number;
        return hex.split('').reverse().join('');
    }
}

console.log(evensAndOdds(456));
console.log(evensAndOdds(457));
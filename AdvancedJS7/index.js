'use strict';

function deleteElementsByAlphabet(str, n) {
    let char = 'a';
    let charCode = +char.charCodeAt(0);
    let counter = 0;
    do {
        if(str.includes(char)) {
            str = str.split('');
            str.splice(str.indexOf(char), 1);
            str = str.join('');
            counter++;
        }
        else {
            char = String.fromCharCode(++charCode);
        }
        if(str === '') break;
    } while(counter < n);
    return str;
}

console.log(deleteElementsByAlphabet('abracadabra', 1));
console.log(deleteElementsByAlphabet('abracadabra', 2));
console.log(deleteElementsByAlphabet('abracadabra', 6));
console.log(deleteElementsByAlphabet('abracadabra', 8));
console.log(deleteElementsByAlphabet('abracadabra',50));
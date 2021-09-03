'use strict';

function deleteElementsByAlphabet(str, n) {
    let char = 'a';
    let charCode = +char.charCodeAt(0);
    let index = 0;
    let counter = 0;
    do {
        if(str[index] === char) {
            str = str.split('');
            str.splice(index, 1);
            str = str.join('');
            counter++;
        }
        if(str.length !== 1)index++;
        if(counter === n || str === '') break;
        if(index > str.length) {
            index = 0;
            char = String.fromCharCode(++charCode);
        }
    } while(counter < n);
    return str;
}

console.log(deleteElementsByAlphabet('abracadabra', 1));
console.log(deleteElementsByAlphabet('abracadabra', 2));
console.log(deleteElementsByAlphabet('abracadabra', 6));
console.log(deleteElementsByAlphabet('abracadabra', 8));
console.log(deleteElementsByAlphabet('abracadabra',50));

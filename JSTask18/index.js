"use strict";
function spacey(array) {
    let currentElement = '';
    for(let i = 0; i < array.length; i++) {
        currentElement += array[i];
        array[i] = currentElement;
    }
    return array;
}
console.log(spacey(['kevin', 'has','no','space']));
console.log(spacey(['this','cheese','has','no','holes']));
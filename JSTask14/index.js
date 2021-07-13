"use strict";
function removeExclamationPoint(string, number) {
    let n = 0;
    let splitString = string.split(''), modifiedString;
    for(let i = 0; i < splitString.length && n < number; ) {
        if(splitString[i] === '!') {
            splitString.splice(i, 1);
            n++;
            continue;
        }
        i++;
    }
    modifiedString = splitString.join('');
    return modifiedString;
}
console.log(removeExclamationPoint("Hi!",1));
console.log(removeExclamationPoint("Hi!",100));
console.log(removeExclamationPoint("Hi!!!",1));
console.log(removeExclamationPoint("Hi!!!",100));
console.log(removeExclamationPoint("!Hi",1));
console.log(removeExclamationPoint("!Hi!",1));
console.log(removeExclamationPoint("!Hi!",100));
console.log(removeExclamationPoint("!!!Hi !!hi!!! !hi",1));
console.log(removeExclamationPoint("!!!Hi !!hi!!! !hi",3));
console.log(removeExclamationPoint("!!!Hi !!hi!!! !hi",5));
console.log(removeExclamationPoint("!!!Hi !!hi!!! !hi",100));
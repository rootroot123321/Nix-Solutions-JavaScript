"use strict";
function switcheroo(string) {
    let array = string.split('');
    for(let i = 0; i < array.length; i++) {
        switch(array[i]) {
            case 'a':
                array[i] = 'b';
                break;
            case 'b':
                array[i] = 'a';
                break;
        }
    }
    return array.join('');
}
console.log(switcheroo('abc'));
console.log(switcheroo('aaabcccbaaa'));
console.log(switcheroo('ccccc'));
console.log(switcheroo('acb'));
console.log(switcheroo('aabacbaa'));
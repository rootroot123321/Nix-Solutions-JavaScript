"use strict";
let numberArray = [10, 20, 30, 50, 235, 3000];
for(let i = 0; numberArray.length; i++)
{
    let number = '' + numberArray[i];
    if(number[0] === '1' || number[0] === '2' || number[0] === '5')
        alert('Number ' + (i + 1) + ': ' + numberArray[i]);
}
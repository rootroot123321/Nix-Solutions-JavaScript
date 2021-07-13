"use strict";
function unwantedNamesArray(namesArray) {
    const unwantedNames = ['Дима', 'Саша', 'Ольга', 'Никита'];
    outer:for(let i = 0; i < namesArray.length; )
    {
        for(let j = 0; j < unwantedNames.length; j++)
            if(namesArray[i] === unwantedNames[j]) {
                namesArray.splice(i, 1);
                continue outer;
            }
        i++;
    }
    return namesArray;
}

console.log(unwantedNamesArray(['Никита', 'Саша', 'Анастасия', 'Дима', 'Саныч', 'Ольга']));
console.log(unwantedNamesArray(['Алексей', 'Семён', 'Василиса', 'Дима', 'Максим', 'Ольга']));
console.log(unwantedNamesArray(['Алишер', 'Ольга']));
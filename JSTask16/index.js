"use strict";
function wordLettersMore(string, n) {
    let words;
    let moreLettersArray = [];
    string = string.replace(/[,.;\-:]/g, '');
    words = string.split(' ');
    for(let i = 0; i < words.length; i++)
        if(words[i].length > n)
            moreLettersArray.push(words[i]);
    return moreLettersArray;
}

console.log(wordLettersMore('Сегодня отличный день. С самого утра мы пойдем на озеро, купаться.', 5));
console.log(wordLettersMore('Над городом облака, коридоры, берега, проспект, река.', 7));
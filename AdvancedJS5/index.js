function findVowels1(str) {
    return str.match(/[аеёиоуыэюя]/gi).length;
}

function findVowels2(str) {
    return str.split('').filter((item) => item.match(/[аеёиоуыэюя]/i)).length;
}

function findVowels3(str) {
    return str.split('').filter((item) => /[аеёиоуыэюя]/gi.test(item)).length;
}

console.log(findVowels1('Привет'));
console.log(findVowels2('Привет'));
console.log(findVowels3('Привет'));
console.log(findVowels1('Абракадабра'));
console.log(findVowels2('Абракадабра'));
console.log(findVowels3('Абракадабра'));
"use strict";
let nameArray = ['Саша', 'Петя', 'Оксана'];
nameArray[0] = 'Оксана';
nameArray[1] = 'Олег';
nameArray[2] = 'Саша';
console.log(nameArray);

nameArray = ['Саша', 'Петя', 'Оксана'];
let changedNameArray = [nameArray[2], 'Олег', nameArray[0]];
console.log(changedNameArray);
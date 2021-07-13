"use strict";
let weight = prompt('Введите свой вес', '');
let recommendation;
recommendation = weight < 4 ? 'Пора перекусить' : weight >= 4 && weight <= 5.5 ? 'Вес в норме' : 'Пора на тренировку';
console.log(recommendation);
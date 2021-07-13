"use strict";
let firstNumber = +prompt('Enter the first number', '');
let secondNumber = +prompt('Enter the second number', '');
firstNumber > secondNumber ? alert('The sum: ' + (firstNumber + secondNumber)) : alert('The product: ' + firstNumber * secondNumber);
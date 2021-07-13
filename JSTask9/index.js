"use strict";
function arrayElementsProduct(array) {
    let product = 1;
    for(let i = 0; i < array.length; i++)
        product *= array[i];
    return product;
}

let array = [1, 2, 3, 4, 5, 6];
console.log(arrayElementsProduct(array));
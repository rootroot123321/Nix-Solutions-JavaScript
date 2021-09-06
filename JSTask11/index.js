"use strict";
function subtractArrayProducts1(firstArray, secondArray) {
    let firstArrayElementsProduct = 1, secondArrayElementsProduct = 1;
    for(let i = 0; i < firstArray.length; i++)
        firstArrayElementsProduct *= firstArray[i];
    for(let i = 0; i < secondArray.length; i++)
        secondArrayElementsProduct *= secondArray[i];
    return firstArrayElementsProduct - secondArrayElementsProduct;
}

function subtractArrayProducts2(firstArray, secondArray) {
    return firstArray.reduce((prev, item) => prev * item, 1) - secondArray.reduce((prev, item) => prev * item, 1);
}

console.log(subtractArrayProducts1([3, 2, 5], [1, 4, 4]));
console.log(subtractArrayProducts1([9, 7, 2], [5, 2, 2]));
console.log(subtractArrayProducts1([11, 2, 5], [1, 10, 8]));
console.log(subtractArrayProducts1([4, 4, 7], [3, 9, 3]));
console.log(subtractArrayProducts1([15, 20, 25], [10, 30, 25]));

console.log(subtractArrayProducts2([3, 2, 5], [1, 4, 4]));
console.log(subtractArrayProducts2([9, 7, 2], [5, 2, 2]));
console.log(subtractArrayProducts2([11, 2, 5], [1, 10, 8]));
console.log(subtractArrayProducts2([4, 4, 7], [3, 9, 3]));
console.log(subtractArrayProducts2([15, 20, 25], [10, 30, 25]));
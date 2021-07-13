"use strict";
function subtractArrayProducts(firstArray, secondArray) {
    let firstArrayElementsProduct = 1, secondArrayElementsProduct = 1;
    for(let i = 0; i < firstArray.length; i++)
        firstArrayElementsProduct *= firstArray[i];
    for(let i = 0; i < secondArray.length; i++)
        secondArrayElementsProduct *= secondArray[i];
    return firstArrayElementsProduct - secondArrayElementsProduct;
}
console.log(subtractArrayProducts([3, 2, 5], [1, 4, 4]));
console.log(subtractArrayProducts([9, 7, 2], [5, 2, 2]));
console.log(subtractArrayProducts([11, 2, 5], [1, 10, 8]));
console.log(subtractArrayProducts([4, 4, 7], [3, 9, 3]));
console.log(subtractArrayProducts([15, 20, 25], [10, 30, 25]));
"use strict";
function maxDiff(array) {
    if(array !== [] && array.length > 1) {
        let minValue = array[0], maxValue = array[0];
        for(let i = 0; i < array.length; i++)
        {
            if(minValue > array[i])
                minValue = array[i];
            if(maxValue < array[i])
                maxValue = array[i];
        }
        return maxValue - minValue;
    }
    else return 0;
}

console.log(maxDiff([0, 1, 2, 3, 4, 5, 6]));
console.log(maxDiff([-0, 1, 2, -3, 4, 5, -6]));
console.log(maxDiff([0, 1, 3, 4, 5, 16]));
console.log(maxDiff([16]));
console.log(maxDiff([]));
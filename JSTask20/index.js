"use strict";
function elementsToKeys (array) {
    let object = {
        number: [],
        boolean: [],
        string: []
    };
    for(let i = 0; i < array.length; i++) {
        switch(typeof array[i]) {
            case 'number':
                object.number.push(array[i]);
                break;
            case 'boolean':
                object.boolean.push(array[i]);
                break;
            case 'string':
                object.string.push(array[i]);
                break;
        }
    }
    return object;
}

console.log(elementsToKeys(['a', 1, 2, false, 'b']));
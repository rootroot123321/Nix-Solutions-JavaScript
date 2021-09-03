'use strict';

function checkPassword(password) {
    if(password.match(/^(([A-Z])|([a-z])|(\d)|([!@#$%^&*?])){8,20}$/)
        && password.match(/[A-Z]/)
        && password.match(/[a-z]/)
        && password.match(/\d/)
        && password.match(/[!@#$%^&*?]/)) {
        return 'valid';
    }
    return 'not valid';
}

console.log(checkPassword(""));
console.log(checkPassword("password"));
console.log(checkPassword("P1@p"));
console.log(checkPassword("P1@pP1@p"));
console.log(checkPassword("P1@pP1@pP1@pP1@pP1@pP1@p"));
console.log(checkPassword("Paaaaaa222!!!"));
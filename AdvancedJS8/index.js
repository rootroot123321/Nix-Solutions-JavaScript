'use strict';

function timeCorrect(time) {
    const date = new Date();
    const timeArray = time.split(':');
    date.setHours(timeArray[0]);
    date.setMinutes(timeArray[1]);
    date.setSeconds(timeArray[2]);
    timeArray[0] = date.getHours().toString();
    if(timeArray[0].length === 1) {
        timeArray[0] = '0' + timeArray[0];
    }
    timeArray[1] = date.getMinutes().toString();
    if(timeArray[1].length === 1) {
        timeArray[1] = '0' + timeArray[1];
    }
    timeArray[2] = date.getSeconds().toString();
    if(timeArray[2].length === 1) {
        timeArray[2] = '0' + timeArray[2];
    }
    return timeArray.join(':');
}

console.log(timeCorrect('09:10:01'));
console.log(timeCorrect('11:70:10'));
console.log(timeCorrect('19:99:09'));
console.log(timeCorrect('19:99:99'));
console.log(timeCorrect('24:01:01'));
console.log(timeCorrect('52:01:01'));
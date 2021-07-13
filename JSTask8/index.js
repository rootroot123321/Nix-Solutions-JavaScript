"use strict";
function finalGrade(examGrade, projectNumber) {
    if(examGrade > 90 || projectNumber > 10)
        return 100;
    else if(examGrade > 75 || projectNumber >= 5)
        return 90;
    else if(examGrade > 50 || projectNumber >= 2)
        return 75;
    else
        return 0;
}
alert(finalGrade(+prompt('Enter your exam grade', ''), +prompt('Enter you project number', '')));
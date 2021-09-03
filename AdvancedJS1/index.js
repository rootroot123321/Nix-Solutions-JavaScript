function reverseExpression(exp) {
    const operands = exp.split(/[-+*/]/).reverse();
    const operators = exp.split('').filter(item => item.match(/[-+*/]/)).reverse();
    console.log(operators);
    console.log(operands);
    let result = "";
    operands.forEach((operand, index, operands) =>
        result += index !== operands.length - 1 ? operand + operators[index] : operand
    );
    return result;
}

console.log(reverseExpression("100*b/y"));
console.log(reverseExpression("a+b-c/d*30"));
console.log(reverseExpression("a*b/c+50"));
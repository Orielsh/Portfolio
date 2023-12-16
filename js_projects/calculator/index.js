'use strict';

let input;
let nextInput;
let isNewSession;
let displayValue;
let displayWrapper = document.querySelector('#displayWrapper');
const displayElement = document.querySelector('#display');

const operators = ['+', '-', '*', '÷'];
const errors = {
    syntaxError: "Syntax ERROR",
    mathError: "Math ERROR"
};

initialize();

function onOff(){
    displayWrapper.classList.toggle('display-on');
    initialize();
    displayElement.classList.toggle('d-block');
    displayElement.classList.add('cursor');
}

function initialize(){
    input = [];
    nextInput = '';
    displayValue = '';
    displayElement.innerText = '';
    isNewSession = true;
    displayElement.classList.add('cursor');
}

function append(token){
    if(isNewSession){
        input = [];
        nextInput = '';
        displayValue = '';
        displayElement.innerText = displayValue;
        isNewSession = false;
        displayElement.classList.add('cursor');
    }
    if(isOperator(token)){
        if(nextInput !== '')
            input.push(Number(nextInput));
        input.push(token);
        nextInput = '';
    }else{
        nextInput += token;
    }
    displayValue += token;
    displayElement.innerText = displayValue;
}

function submit(){
    if(nextInput != '')
        input.push(Number(nextInput));
    let isValidInput = validateInput();
    if(isValidInput !== true){
        displayValue = isValidInput;
        displayElement.innerText = displayValue;
        isNewSession = true;
        displayElement.classList.remove('cursor');
        return;
    } 
    cleanInput();
    displayElement.classList.toggle('cursor');
    displayValue = calculate();
    displayElement.innerText = displayValue;
    isNewSession = true;
}

function calculate(){
    let index = 1;
    //operations order - calculate highOperators first.
    while (index < input.length){
        if(isHighOperator(input[index])){
            input[index-1] = operatorFunctions[input[index]](input[index-1], input[index+1]);
            input.splice(index, 2);
            index--;
            if(isNaN(input[index]))
                return errors.syntaxError;
        }
        index ++;
    }
    let sum = 0;
    for (index = 0; index < input.length; index++) {
        sum += input[index];
    }
    return sum;
}

function isOperator(input){
    return operators.includes(input);
}

function isHighOperator(input){
    return operators.indexOf(input) > 1;
}

const operatorFunctions = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) {return x - y },
    '*': function (x, y) { return x * y },
    '÷': function (x, y) {return x / y },
}

function validateInput(){
    if(isHighOperator(input[0]))
        return errors.syntaxError;
    if(isOperator(input[input.length - 1]))
        return errors.syntaxError;
    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if(element === '÷' && input[index + 1] === 0)
            return errors.mathError;
    }
    return true;
}

function cleanInput(){
    let index = 0;
    //re-arrange '+-..' / '-+..' sequence  to --> '-': (for ex.: '-+-+' --> '+').
    while (index < input.length) {
        let c1 = input[index] ==='+' && input [index+1] === '-';
        let c2 = input[index] ==='-' && input [index+1] === '+';
        if(c1 || c2){
            input.splice(index, 1);
            input[index] = '-';
            index --;
        }
        index++;
    }
        
    //re-arrange duplicated +/- operators for ex. '++++' --> '+' etc..
    index = 0;
    while(index < input.length){
        if(input[index] === '+' || input[index] === '-'){
            let j = index;
            while(input[index] === input[j+1])
                j ++;
            input.splice(index, j-index);
            if(input[index] === '-')
                if((j-index) % 2 === 1)
                    input[index]  = '+';
        }
        index ++;
    }

    // assign operators to numbers: ['-', 9] --> [-9]
    index = 0;
    while(index < input.length){
        if(!isOperator(input[index])){
            if(isOperator(input[index-1]) && !isHighOperator(input[index-1])){
                input[index - 1] = Number(input[index-1] + input[index]);
                input.splice(index, 1);
            }
        }index++;
    }
}


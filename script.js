function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                result = "Invalid";
            } else {
                result = a / b;
            }
            break;
    }

    if (result === "Invalid") { 
        return result;   
        } else {                   
        return round(result, 8);
        }
    
}
function round(value, decimals) {
    return parseFloat(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

const buttons = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".perator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector("#clear");
const backspBtn = document.querySelector("#backspace");
const plusMinBtn = document.querySelector("#plusmin");
const decimalBtn = document.querySelector("#decimal");
let displayEl = document.querySelector("#display");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let startNew = true;

function clickButton() {
    buttons.forEach((button) => {
        button.addEventListener("click", function(e) {
            if (button.className === "number") { 
                inputNumber(button.value);       //select value of button being pressed
                updateDisplay(displayValue);
            } else if (button.className === "operator") { //select class
                inputOperator(e);    
                updateDisplay(displayValue);                            
            } else if (button.className === "equals") {
               inputEquals(); 
               updateDisplay(displayValue);  
             } else if (button.id === "clear") {       //select id of button
                clearDisplay();
                updateDisplay(displayValue);
            } else if (button.id === "backspace") {
                inputBackspace();
                updateDisplay(displayValue);
            } else if (button.id === "plusMin") {
                displayValue = (displayValue * -1);  // turn neg into pos and pos into neg
               updateDisplay(displayValue); 
            } else if (button.id === "decimal") {
                inputDecimal(button);
                updateDisplay(displayValue);               
            } else {
                alert("Invalid input");
            }

        });
    });
}

clickButton();

// set display text to initial display Value
displayEl.innerText = displayValue;

function updateDisplay(displayValue) {     
     displayEl.innerText = displayValue;     
    if(displayValue.toString().length > 9) {
        display.innerText = displayValue.toString().substring(0, 9);
    }
}

function inputNumber(value) {   
    
        if (displayValue === "0") { 
            displayValue = "";
            
        } else if (firstOperand != null && startNew === true) {
            startNew = false
            displayValue = "";
        }

        displayValue += value;
}            


function inputOperator(e) {
    if (firstOperand != null && operator != null) {
        secondOperand = parseFloat(displayValue);
        result = operate(operator, firstOperand, secondOperand);
        displayValue = result;
        firstOperand = result;
        secondOperand = null;
        operator = event.target.innerText;
        startNew = true;
    } else {                    // operator === 0, no op selected yet
        operator = event.target.innerText;
        firstOperand = parseFloat(displayValue);
        startNew = true;
    }   
}

function inputEquals() {
    if (operator === null) {  //press = before digiting operator or second operand
        displayValue = displayValue;     
    } else {
        secondOperand = parseFloat(displayValue);
        result = operate(operator, firstOperand, secondOperand);
        displayValue = result;
        secondOperand = null;        
        result = null;
        operator = null;
        startNew = true;      
    }
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    result = null;
    operator = null;
    startNew = true;
}

function inputBackspace() {
    if (displayValue === result) {  // if delete is pressed on the result after equals is pressed
        alert("Invalid input");
        displayValue = displayValue;
    } else {    
    deletedVal = displayValue.slice(0, -1);
    displayValue = deletedVal;
        if (displayValue === "") {
            displayValue = "0";
        }
    }
}

function inputDecimal(button) {
    if (! displayValue.toString().includes(button.innerText)) {
        displayValue += button.innerText;
    }
}



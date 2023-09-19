import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [displayColor, setDisplayColor] = useState(styles.defaultColor);

  const handleEquals = () => {
    if (operator && !waitingForSecondOperand) {
      const inputValue = parseInt(displayValue, 10);
      if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
      }
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(true);
      setDisplayColor(styles.resultColor);
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setDisplayColor(styles.defaultColor);
  };

  const buttons = [
    { label: "7", action: () => inputDigit(7) },
    { label: "8", action: () => inputDigit(8) },
    { label: "9", action: () => inputDigit(9) },
    { label: "4", action: () => inputDigit(4) },
    { label: "5", action: () => inputDigit(5) },
    { label: "6", action: () => inputDigit(6) },
    { label: "1", action: () => inputDigit(1) },
    { label: "2", action: () => inputDigit(2) },
    { label: "3", action: () => inputDigit(3) },
    { label: "0", action: () => inputDigit(0) },
    { label: "-", action: () => performOperation("-") },
    { label: "+", action: () => performOperation("+") },
    { label: "C", action: clearDisplay },
    { label: "=", action: handleEquals },
  ];

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
    setDisplayColor(styles.defaultColor);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseInt(displayValue, 10);

    if (isNaN(inputValue)) {
      alert("Please enter a valid number.");
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setDisplayColor(styles.defaultColor);
  };

  const calculate = (leftOperand, rightOperand, operator) => {
    switch (operator) {
      case "+":
        return leftOperand + rightOperand;
      case "-":
        return leftOperand - rightOperand;
      default:
        return rightOperand;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${displayColor}`}>{displayValue}</div>
      <div className={styles.buttons}>
        <div className={styles.row}>
          {buttons.map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={styles.digitButton}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

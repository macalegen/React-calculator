import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [displayColor, setDisplayColor] = useState(styles.defaultColor);

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${displayColor}`}>{displayValue}</div>
      <div className={styles.buttons}>
        <div className={styles.row}>
          {digits.map((digit) => (
            <button key={digit} onClick={() => inputDigit(digit)}>
              {digit}
            </button>
          ))}

          <button
            className={styles.minusButton}
            onClick={() => performOperation("-")}
          >
            -
          </button>
          <button
            className={styles.plusButton}
            onClick={() => performOperation("+")}
          >
            +
          </button>
          <button onClick={handleEquals} className={styles.equalsButton}>
            =
          </button>
        </div>
        <button onClick={clearDisplay} className={styles.clearButton}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;

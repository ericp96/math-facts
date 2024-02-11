import { Operator } from '../constants/Enum';
import { OperatorSymbol } from '../constants/Types';

export function performOperation(operator: Operator, a: number, b: number): number {
  switch (operator) {
    case Operator.Addition:
      return a + b;
    case Operator.Subtraction:
      return a - b;
    case Operator.Multiplication:
      return a * b;
    case Operator.Division:
      return a / b;
  }
}

export function getOperatorSymbol(operator: Operator): OperatorSymbol {
  switch (operator) {
    case Operator.Addition:
      return '+';
    case Operator.Subtraction:
      return '-';
    case Operator.Multiplication:
      return 'x';
    case Operator.Division:
      return '÷';
  }
}

export function getSolution(operator: Operator, numbers: Array<number>): number {
  return numbers.reduce((a, b) => performOperation(operator, a, b));
}

export function getRandomNumber(max: number, min: number = 0): number {
  const range = max - min;
  const roundingFn = Math.random() > 0.5 ? Math.ceil : Math.floor;
  return Math.min(max, roundingFn(Math.random() * range) + min);
}

export function sumRequiresRegrouping(number1: number, number2: number): boolean {
  const remainder1 = number1 % 10;
  const remainder2 = number2 % 10;
  return remainder1 + remainder2 >= 10;
}

export function differenceRequiresBorrowing(
  number1: number,
  number2: number
): boolean {
  if (number1 < number2) {
    return true;
  }

  const biggerNumber = number1 > number2 ? number1 : number2;
  let biggestPowerOfTen = Math.floor(Math.log10(biggerNumber));
  let requiresBorrowing = false;

  while (biggestPowerOfTen >= 0) {
    const factor = Math.pow(10, biggestPowerOfTen);
    const num1 = Math.floor(number1 / factor);
    const num2 = Math.floor(number2 / factor);

    if (num1 < num2) {
      requiresBorrowing = true;
    }

    number1 = number1 - num1 * factor;
    number2 = number2 - num2 * factor;
    biggestPowerOfTen--;
  }

  return requiresBorrowing;
}

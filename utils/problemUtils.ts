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

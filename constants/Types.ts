import { Operator } from './Enum';

export type Problem = {
  operator: Operator;
  numbers: Array<number>;
  solution: number;
};

export type GetProblem = () => Problem;

export type OperatorSymbol = '+' | '-' | 'x' | '/';

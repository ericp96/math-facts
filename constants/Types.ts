import { Operator } from './Enum';

export type Problem = {
  operator: Operator;
  numbers: Array<number>;
  solution: number;
};

export type GetProblem = (config: any) => Problem;
export type FetchProblem = () => Problem;

export type OperatorSymbol = '+' | '-' | 'x' | '÷';

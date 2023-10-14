import { useCallback } from 'react';
import { Operator } from '../constants/Enum';
import { GetProblem, Problem } from '../constants/Types';
import { performOperation } from '../utils/problemUtils';

type Config = {
  operator: Operator;
  range: {
    min: number;
    max: number;
  };
};

function getSolution(operator: Operator, numbers: Array<number>): number {
  return numbers.reduce((a, b) => performOperation(operator, a, b));
}

export function useGetOperatorProblem(config: Config): GetProblem {
  const range = config.range.max - config.range.min;
  return useCallback(() => {
    const numbers = [...new Array(2)].map(() => config.range.min + Math.floor(Math.random() * range));

    return {
      operator: config.operator,
      numbers,
      solution: getSolution(config.operator, numbers),
    };
  }, []);
}

export function useFetchProblem(): GetProblem {
  const getAdditionProblem = useGetOperatorProblem({ operator: Operator.Addition, range: { min: 0, max: 100 } });
  const getMultiplicationProblem = useGetOperatorProblem({
    operator: Operator.Multiplication,
    range: { min: 0, max: 12 },
  });
  return Math.random() > 0.5 ? getAdditionProblem : getMultiplicationProblem;
}

// export function useFetchProblem(): GetProblem {
//   const getAdditionProblem = useGetOperatorProblem({ operator: Operator.Addition, range: { min: 0, max: 4 } });
//   return getAdditionProblem;
// }

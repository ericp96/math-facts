import { useCallback } from "react";
import { Operator } from "../constants/Enum";
import { FetchProblem, GetProblem } from "../constants/Types";
import {
  differenceRequiresBorrowing,
  getRandomNumber,
  getSolution,
  performOperation,
  sumRequiresRegrouping,
} from "../utils/problemUtils";
import { useQuery } from "@realm/react";
import { OperatorConfig } from "../models/OperatorConfigModel";
import {
  AdditionDefaults,
  DivisionDefaults,
  MultiplicationDefaults,
  SubtractionDefaults,
} from "../constants/ConfigDefaults";

const getAdditionProblem: GetProblem = (config) => {
  let firstNumber = 0;
  let secondNumber = 0;

  let attempt = 0;
  do {
    if (attempt > 100) {
      throw new Error("Unable to generate an addition problem");
    }
    attempt++;
    firstNumber = getRandomNumber(config.firstNumberMax, config.firstNumberMin);
    secondNumber = getRandomNumber(
      config.secondNumberMax,
      config.secondNumberMin
    );
  } while (
    !config.enableRegrouping &&
    sumRequiresRegrouping(firstNumber, secondNumber)
  );

  const numbers = [firstNumber, secondNumber];

  return {
    operator: Operator.Addition,
    numbers,
    solution: getSolution(Operator.Addition, numbers),
  };
};

const getSubtractionProblem: GetProblem = (config) => {
  let firstNumber = 0;
  let secondNumber = 0;
  let attempt = 0;

  do {
    if (attempt > 100) {
      throw new Error("Unable to generate a subtraction problem");
    }
    attempt++;
    firstNumber = getRandomNumber(config.firstNumberMax, config.firstNumberMin);
    secondNumber = getRandomNumber(
      config.secondNumberMax,
      config.secondNumberMin
    );

    // Don't allow for negative answers
    if (!config.allowNegatives && firstNumber < secondNumber) {
      const placeholder = firstNumber;
      firstNumber = secondNumber;
      secondNumber = placeholder;
    }
  } while (
    !config.enableRegrouping &&
    differenceRequiresBorrowing(firstNumber, secondNumber)
  );

  const numbers = [firstNumber, secondNumber];

  return {
    operator: Operator.Subtraction,
    numbers,
    solution: getSolution(Operator.Subtraction, numbers),
  };
};

const getMultiplicationProblem: GetProblem = (config) => {
  const numbers: Array<number> = [];

  if (config.isRange) {
    numbers.push(
      getRandomNumber(config.firstNumberMax, config.firstNumberMin),
      getRandomNumber(config.secondNumberMax, config.secondNumberMin)
    );
  } else {
    const eligibleNumbers = [...new Array(12)]
      .map((_, i) => i + 1)
      .filter((v) => config[`enable${v}`]);

    const otherNumbers = [...new Array(13)].map((_, i) => i);

    numbers.push(
      otherNumbers[getRandomNumber(otherNumbers.length - 1)],
      eligibleNumbers[getRandomNumber(eligibleNumbers.length - 1)]
    );
  }

  return {
    operator: Operator.Multiplication,
    numbers,
    solution: getSolution(Operator.Multiplication, numbers),
  };
};

const getDivisionProblem: GetProblem = (config) => {
  const numbers: Array<number> = [];

  const allNumbers = [...new Array(12)].map((_, i) => i + 1);

  const eligibleNumbers = allNumbers.filter((v) => config[`enable${v}`]);

  const answer = allNumbers[getRandomNumber(allNumbers.length - 1)];
  const divisor = eligibleNumbers[getRandomNumber(eligibleNumbers.length - 1)];

  numbers.push(answer * divisor, divisor);

  return {
    operator: Operator.Division,
    numbers,
    solution: getSolution(Operator.Division, numbers),
  };
};

const operatorFunctions = {
  [Operator.Addition]: getAdditionProblem,
  [Operator.Subtraction]: getSubtractionProblem,
  [Operator.Multiplication]: getMultiplicationProblem,
  [Operator.Division]: getDivisionProblem,
};

const operatorDefaults = {
  [Operator.Addition]: AdditionDefaults,
  [Operator.Subtraction]: SubtractionDefaults,
  [Operator.Multiplication]: MultiplicationDefaults,
  [Operator.Division]: DivisionDefaults,
};

export function useFetchProblem(): FetchProblem {
  const operatorConfigs = useQuery(OperatorConfig).filtered(
    "$0 == enabled",
    true
  );

  return useCallback(() => {
    if (operatorConfigs.length == 0) {
      throw new Error("No operator configs stored");
    }
    const operatorIndex = getRandomNumber(operatorConfigs.length - 1);
    const config = operatorConfigs[operatorIndex];
    
    // @ts-ignore
    const operatorFunction = operatorFunctions[config.operator];
    // @ts-ignore
    const defaults = operatorDefaults[config.operator] || {};
    const operatorConfig = { ...defaults, ...config?.config };
    
    if (operatorFunction == null) {
      throw new Error("Backing math operator not implemented:" + config.operator);
    }

    const nextProblem = operatorFunction(operatorConfig);

    console.log("NEXT PROBLEM:", JSON.stringify(nextProblem));
    console.log("CONFIG:", JSON.stringify(operatorConfig));

    return nextProblem;
  }, [operatorConfigs]);
}

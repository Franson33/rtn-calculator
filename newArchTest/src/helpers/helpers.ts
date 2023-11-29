import RTNCalculator from 'rtn-calculator/js/NativeCalculator';

const countPair = async (a: number, b: number, operator: string) => {
  if (operator === '+') {
    return await RTNCalculator?.add(a, b);
  }
};

const parseScreenValue = (value: string) => {
  let operators: string[] = [];
  let operands: number[] = [];

  [...value].reduce((accumulator, current, i) => {
    if (current === '+') {
      operands.push(+accumulator);
      operators.push(current);
      return '';
    }
    accumulator += current;
    if (i === value.length - 1) {
      operands.push(+accumulator);
    }
    return accumulator;
  }, '');

  return {operands, operators};
};

export const countResult = async (value: string) => {
  const {operands, operators} = parseScreenValue(value);

  const result = await operators.reduce(async (accumulator, current, i) => {
    const acc = await accumulator;
    return operands[i + 1] ? countPair(acc, operands[i + 1], current) : acc;
  }, operands[0]);

  if (operands.length > 1) {
    return result;
  }
};

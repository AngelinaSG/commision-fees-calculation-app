interface RoundingHelperInterface {
  roundUp: (number: number) => string;
}

class _RoundingHelper implements RoundingHelperInterface {
  roundUp = (number) => {
    const roundedNumber = Math.ceil(number * 100) / 100;
    return roundedNumber.toFixed(2);
  };
}

export const RoundingHelper = new _RoundingHelper();

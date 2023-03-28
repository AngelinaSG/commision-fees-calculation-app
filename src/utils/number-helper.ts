interface NumberHelperInterface {
  roundUp: (number: number) => number;

  formatToFixed: (number: number, digits: number) => string;
}

class _NumberHelper implements NumberHelperInterface {
  roundUp = (number) => {
    return Math.ceil(number * 100) / 100;
  };

  formatToFixed = (number, digits) => {
    return number.toFixed(digits);
  };
}

export const NumberHelper = new _NumberHelper();

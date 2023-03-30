interface NumberHelperInterface {
  roundUp: (number: number) => number;

  formatToFixed: (number: number, digits: number) => string;

  calculatePercentage: (number: number, percent: number) => number;
}

class _NumberHelper implements NumberHelperInterface {
  roundUp = (number) => {
    return Math.ceil(number * 100) / 100;
  };

  formatToFixed = (number, digits) => {
    return number.toFixed(digits);
  };

  calculatePercentage = (number, percentage) => {
    return (number * percentage) / 100;
  };
}

export const NumberHelper = new _NumberHelper();

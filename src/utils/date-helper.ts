import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

interface DateHelperInterface {
  isSame: (payload: {
    firstDate: string;
    secondDate: string;
    unit: string;
  }) => boolean;
}

class _DateHelper implements DateHelperInterface {
  private readonly datePlugin;

  constructor(datePlugin, locale) {
    this.datePlugin = datePlugin;

    this.datePlugin.locale({
      ...locale,
      weekStart: 1,
    });
  }

  isSame = ({ firstDate, secondDate, unit }) => {
    return this.datePlugin(firstDate).isSame(secondDate, unit);
  };
}

export const DateHelper = new _DateHelper(dayjs, en);

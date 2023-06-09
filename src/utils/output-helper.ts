import gradient from 'gradient-string';

interface OutputHelperInterface {
  simple: (data: any) => void;
  gradient: (gradientType: 'passion' | 'teen', data: string) => void;

  error: (data: string) => void;
}

class _OutputHelper implements OutputHelperInterface {
  private readonly outputPlugin;

  constructor(outputPlugin) {
    this.outputPlugin = outputPlugin;
  }

  simple = (data) => {
    console.log(data);
  };

  gradient = (gradientType, data) => {
    console.log(this.outputPlugin[gradientType](data));
  };

  error = (data) => {
    console.error(this.outputPlugin.passion(data));
  };
}

export const OutputHelper = new _OutputHelper(gradient);

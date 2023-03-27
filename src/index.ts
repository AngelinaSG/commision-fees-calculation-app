import { processCalculation } from './controllers/fee-calculation-controller';

const init = (pathToFile) => {
  processCalculation(pathToFile);
};

const pathToFile = `./${process.argv[2]}`;

init(pathToFile);

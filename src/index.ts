import { processCalculation } from './controllers/fee-calculation-controller';

const fileName = process.argv[2];
const pathToFile = `./${fileName}`;

init(pathToFile);

function init(pathToFile: string) {
  processCalculation(pathToFile);
}

import { processCalculation } from './controllers/fee-calculation-controller';
import { config } from './config/config';
import { OutputHelper } from './utils/output-helper';

const fileName = process.argv[2];
const pathToFile = `./${fileName}`;

init(pathToFile);

function init(pathToFile: string) {
  if (!config.API_BASE_URL) {
    return OutputHelper.error('ERROR: Please, provide API_BASE_URL');
  }
  processCalculation(pathToFile);
}

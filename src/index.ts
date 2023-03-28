import { processCalculation } from './controllers/fee-calculation-controller';
import { config } from './config/config';

const [fileName] = process.argv[2];
const pathToFile = fileName ? `./${fileName}` : config.INPUT_FILE_PATH;

init(pathToFile);

function init(pathToFile: string) {
  processCalculation(pathToFile);
}

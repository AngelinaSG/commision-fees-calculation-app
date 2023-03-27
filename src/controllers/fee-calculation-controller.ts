import { parseFile } from '../utils/parse-file';
import { calculateFee } from '../services/comissions-fee-calculation-service';
import { getCommissionFee } from '../models/commission-fee';
import {ICashOperation} from "types/types";

export const processCalculation = async (pathToFile) => {
  console.log('Start fee calculation...\n');

  const operationsList = await parseFile<ICashOperation[]>(pathToFile);

  const { cashInFee, cashOutJuridicalFee, cashOutNaturalFee } =
    await getCommissionFee();

  const feeList = calculateFee({
    operationsList,
    cashInFee,
    cashOutJuridicalFee,
    cashOutNaturalFee,
  });

  outputData(feeList);

  console.log('Fee calculation have finished successfully:)\n');
};

const outputData = (data: string[]) => {
  data.forEach((res) => console.log(`${res}\n`));
};

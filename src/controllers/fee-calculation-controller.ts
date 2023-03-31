import { parseFile } from '../utils/parse-file/parse-file';
import { calculateFee } from '../services/commission-fee-calculation/commission-fee-calculation-service';
import { ICashOperation } from 'types/types';
import { getCommissionFee } from '../services/commission-fee-calculation/get-commission-fees';
import { OutputHelper } from '../utils/output-helper';

export const processCalculation = async (pathToFile: string) => {
  OutputHelper.gradient('teen', 'Start fee calculation...\n');

  try {
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

    OutputHelper.gradient(
      'teen',
      'Fee calculation have finished successfully:)',
    );
  } catch (error) {
    return OutputHelper.gradient('passion', (error as Error).message);
  }
};

const outputData = (data: string[]) => {
  data.forEach((value) => OutputHelper.simple(`${value}\n`));
};

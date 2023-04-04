import fs from 'fs/promises';
import { getValidJSON } from '../get-valid-json';

export async function parseFile<T>(pathToFile: string): Promise<T> {
  const data = await fs.readFile(pathToFile);

  const validJSON = await getValidJSON(data.toString());

  if (!validJSON)
    throw new Error('ERROR: input file is empty or data is invalid');

  return validJSON;
}

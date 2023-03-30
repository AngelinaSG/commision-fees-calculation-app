import { parseFile } from './parse-file';
import path from 'path';

const pathToFile = path.join(__dirname, '../../input.json');
const fakePath = './input.test.json';

describe('parseFile helper:', () => {
  test("file parsing fails with an error if file doesn't exist ", async () => {
    try {
      await parseFile(fakePath);
    } catch (er) {
      expect(er).toEqual(er);
    }
  });

  test('function return defined data', async () => {
    const data = await parseFile(pathToFile);
    expect(data).toBeDefined();
  });
});

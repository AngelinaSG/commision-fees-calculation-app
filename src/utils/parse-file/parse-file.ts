import fs from 'fs';

export function parseFile<T>(pathToFile: string) {
  return new Promise<T>((resolve, reject) => {
    fs.readFile(pathToFile, (error, data) => {
      if (error) return reject(error);
      return resolve(JSON.parse(Buffer.from(data).toString()));
    });
  });
}

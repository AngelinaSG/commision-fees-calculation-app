import fs from 'fs';

export function parseFile<T>(pathToFile: string) {
  return new Promise<T>((resolve, reject) => {
    fs.readFile(pathToFile, (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(Buffer.from(data).toString()));
    });
  });
}

import * as fs from 'fs';
import { join } from 'path';

export const readRecordFile = (filename: string): Promise<string[]> => {
  const filePath = join(process.cwd(), `src/assets/${filename}`);
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err); 
        } else {
          resolve(data.split(/\r?\n/));
        }
    });
  });
};

import { createHash } from 'crypto';
import * as fs from 'fs';
import path from 'path';
import { currentSysDirectory } from './index.mjs';

export const hash = async (filePath) => {
  const resolvedDirectory = path.resolve(currentSysDirectory, filePath);
  fs.readFile(resolvedDirectory, (err, data) => {
    if (err) {
      console.log('There is no such a file or you try to hash a folder. Maybe you forgot the extension? (.txt) Try again!');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      const hash = createHash('sha256').update(data).digest('hex');
      console.log(hash);
    }
  });
};

import { createReadStream } from 'fs';
import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const read = async (filePath) => {
  const resolvedDirectory = path.resolve(currentSysDirectory, filePath);
  fs.readFile(resolvedDirectory, (err) => {
    if (err) {
      console.log('There is no such a file! Maybe you forgot to add the extension? (example.txt)');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      process.stdout.write(`You are reading ${currentSysDirectory}\n`);
      const readStream = createReadStream(resolvedDirectory, 'utf-8');
      readStream.on('error', (error) => console.error(`error: ${error}`));
      readStream.on('data', (data) => process.stdout.write(data + '\n'));
    }
  });
};

export default read;

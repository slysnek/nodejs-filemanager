import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const del = async (filePath) => {
  const resolvedDirectory = path.resolve(currentSysDirectory, filePath);

  fs.readFile(resolvedDirectory, (err) => {
    if (err) {
      console.log('There is no such a file! Maybe you forgot to add the extension? (example.txt)');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      fs.unlink(resolvedDirectory, (err) => {
        if (err) {
          process.stdout.write(`Something has gone wrong and file cannot be deleted!\n`);
        }
        console.log('File was deleted!');
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
      });
    }
  });
};

export default del;

import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const add = async (fileName) => {
  const resolvedDirectory = path.resolve(currentSysDirectory, fileName);
  fs.access(resolvedDirectory, (err) => {
    if (err) {
      fs.open(resolvedDirectory, 'w', function (err) {
        if (err) throw err;
        console.log('Success!');
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
      });
    } else {
      console.log('There is a file with that name already!');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    }
  });
};

export default add;

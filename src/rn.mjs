import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const rn = async (oldName, newName) => {
  const resolvedOldDirectory = path.resolve(currentSysDirectory, oldName);
  const resolvedNewDirectory = path.resolve(currentSysDirectory, newName);
  fs.access(resolvedNewDirectory, (err) => {
    if (err) {
      fs.rename(resolvedOldDirectory, resolvedNewDirectory, (err) => {
        if (err) {
          process.stdout.write(`Something has gone wrong! Perhaps there is no file with such a name to rename?\n`);
          process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
          return
        };
        console.log('Success!');
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
      });
    } else {
      console.log('There is a file with that name already!');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    }
  });
};

export default rn;

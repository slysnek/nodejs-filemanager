import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const cp = async (fileName, newDirectory) => {
  const resolvedOldDirectory = path.resolve(currentSysDirectory, fileName);
  const resolvedNewDirectory = path.resolve(currentSysDirectory, path.join(newDirectory, fileName));

  fs.readFile(resolvedOldDirectory, (err) => {
    if (err) {
      console.log('There is no such a file! Maybe you forgot to add the extension? (example.txt)');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      fs.access(path.join(resolvedNewDirectory, '..'), (err) => {
        if (err) {
          console.log('There is no such a directory to copy the file to!');
          process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
        } else {
          const readStream = fs.createReadStream(resolvedOldDirectory, 'utf-8');
          const writeStream = fs.createWriteStream(resolvedNewDirectory);
          readStream.on('data', (text) => {
            writeStream.write(text);
          });
          readStream.on('error', () =>
            process.stdout.write(`Something has gone wrong. Perhaps you forgot to add the file extension?\n`)
          );

          writeStream.on('error', () =>
            process.stdout.write(`Something has gone wrong. Perhaps you made mistake in directory name?\n`)
          );
          writeStream.on('finish', () => {
            console.log(`You have successfully created a copy!`);
            process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
          });
        }
      });
    }
  });
};

export default cp;

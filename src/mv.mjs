import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const mv = async (fileName, newDirectory) => {
  const resolvedOldDirectory = path.resolve(currentSysDirectory, fileName);
  const resolvedNewDirectory = path.resolve(currentSysDirectory, path.join(newDirectory, fileName));

  fs.readFile(resolvedOldDirectory, (err) => {
    if (err) {
      console.log('There is no such a file! Maybe you forgot to add the extension? (example.txt)');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      fs.access(path.join(resolvedNewDirectory, '..'), (err) => {
        if (err) {
          console.log('There is no such a directory to move the file to!');
          process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
        } else {
          process.stdout.write(`You are reading ${currentSysDirectory}\n`);

          const readStream = fs.createReadStream(resolvedOldDirectory, 'utf-8');
          const writeStream = fs.createWriteStream(resolvedNewDirectory);

          readStream.on('data', (text) => {
            writeStream.write(text);
          });
          readStream.on('error', () =>
            process.stdout.write(`Something has gone wrong. Perhaps you forgot to add the file extension?\n`)
          );
          readStream.on('end', () =>
            fs.unlink(resolvedOldDirectory, (err) => {
              if (err) {
                process.stdout.write(`Something has gone wrong and file cannot be deleted!\n`);
              }
              console.log('File was moved!');
            })
          );

          writeStream.on('error', () =>
            process.stdout.write(`Something has gone wrong. Perhaps you made mistake in directory name?\n`)
          );
          writeStream.on('finish', () => {
            console.log(`You have successfully moved the file!`);
            process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
          });
        }
      });
    }
  });
};

export default mv;

import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const cp = async (fileName, newDirectory) => {
  const resolvedOldDirectory = path.resolve(currentSysDirectory, fileName);
  const resolvedNewDirectory = path.resolve(currentSysDirectory, path.join(newDirectory, fileName));
  const readStream = fs.createReadStream(resolvedOldDirectory, 'utf-8');
  const writeStream = fs.createWriteStream(resolvedNewDirectory);
  readStream.on('data', (text) => {writeStream.write(text)});
  readStream.on('error', () => process.stdout.write(`Something has gone wrong. Perhaps you forgot to add the file extension?\n`));

  writeStream.on('error', () => process.stdout.write(`Something has gone wrong. Perhaps you made mistake in directory name?\n`));
  writeStream.on('finish', () => {
    console.log(`You have successfully created a copy!`);
    process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
})

};

export default cp;

import path from 'path';
import * as fs from 'fs';
import * as zlib from 'zlib';
import { currentSysDirectory } from './index.mjs';

const brotli = async (filePath, newDirectory) => {
  const resolvedOldDirectory = path.resolve(currentSysDirectory, filePath);
  let resolvedNewDirectory;
  let action = '';
  if (filePath.split('.')[2] === 'br') {
    resolvedNewDirectory = path.resolve(currentSysDirectory, filePath.slice(0, -3));
    action = 'decompress';
  } else {
    resolvedNewDirectory = path.resolve(currentSysDirectory, path.basename(newDirectory, filePath + '.br'));
    action = 'compress';
  }
  fs.readFile(resolvedOldDirectory, (err) => {
    if (err) {
      console.log('There is no such a file! Maybe you forgot to add the extension? (example.txt)');
      process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    } else {
      fs.access(path.join(resolvedNewDirectory, '..'), (err) => {
        if (err) {
          console.log('There is no such a directory to compress the file to!');
          process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
        } else {
          const readStream = fs.createReadStream(resolvedOldDirectory);
          const writeStream = fs.createWriteStream(resolvedNewDirectory);
          if (action === 'compress') {
            const brotli = zlib.createBrotliCompress();
            const stream = readStream.pipe(brotli).pipe(writeStream);
            stream.on('finish', () => {
              console.log('The file has been compressed');
              process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
            });
          } else {
            const brotli = zlib.createBrotliDecompress();
            const stream = readStream.pipe(brotli).pipe(writeStream);
            stream.on('error', (err) => {console.log(err);})
            stream.on('finish', () => {
              console.log('The file has been decompressed');
              process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
            });
          }
        }
      });
    }
  });
};

export default brotli;

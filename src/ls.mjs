import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const ls = async () => {
  const fileArray = await fs.promises.readdir(currentSysDirectory)
  if (fileArray.length === 0) {
    process.stdout.write(`No files in this directory!\n`);
  }
  const dataArray = [];
  fileArray.forEach((file, index) => {
    fs.stat(path.join(currentSysDirectory, file), (err, stats) => {
      if (err) {
        process.stdout.write(`Something has gone wrong!\n`);
      } else {
        if (stats.isFile()) {
          dataArray.push(
            path.basename(file, path.extname(file)) +
            ' - ' + 'file')
        } else {
          dataArray.push(path.basename(file) + ' - ' + 'directory');
        }
      }
    });
  });
  setTimeout(() => {
    dataArray.sort((a, b) => a.split(' - ')[1].localeCompare(b.split(' - ')[1]))
    dataArray.forEach((el, index) => {
      process.stdout.write(index + ' - ' + el + '\n');
    })
  }, 10)

};

export default ls;

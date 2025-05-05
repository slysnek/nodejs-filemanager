import path from 'path';
import * as fs from 'fs';
import { currentSysDirectory } from './index.mjs';

const mkdir = async (dirPath) => {
    const resolvedDirectory = path.resolve(currentSysDirectory, dirPath);
    fs.mkdir(resolvedDirectory, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log('This directory already exists! Try another name!');
        } else if (err.code === 'ENOENT') {
          console.log('There is no parent directory!');
        } else {
          console.log(`Error: ${err.message}`);
        }
      } else {
        console.log(`You have created directory ${dirPath} at path ${resolvedDirectory}`);
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
      }
    });
  };
  
export default mkdir;

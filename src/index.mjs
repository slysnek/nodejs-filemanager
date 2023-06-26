import { createInterface } from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import * as fs from 'fs';
import read from './read.mjs';
import ls from './ls.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export let currentSysDirectory = homedir();

const rline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startManager = async () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((el) => {
    return el.startsWith('--username');
  });
  const username = usernameArg ? usernameArg.split('=')[1] : 'anonymous user';
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
  process.stdout.write('Enter your command: ');
  rline.on('line', (text) => {
    switch (text.split(' ')[0]) {
      case '.exit':
        process.exit();
      case 'up':
        console.log('Going up in directory...');
        currentSysDirectory = path.join(currentSysDirectory, '../');
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
        break;
      case 'cd':
        if (text.split('cd ')[1] === undefined) {
          process.stdout.write(`Invalid input. If you want to change directory, please type cd location_name\n`);
          break;
        }
        console.log('Moving to new directory...');
        console.log(text);
        const newDirectory = path.resolve(currentSysDirectory, text.split('cd ')[1]);
        fs.access(newDirectory, (err) => {
          if (err) {
            console.log('There is no such directory! Please, try again');
            process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
          } else {
            currentSysDirectory = newDirectory;
            process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
            process.stdout.write('Enter your command: ');
          }
        });
        break;
      case 'ls':
        ls();
        break;
      case 'cat':
        if (text.split('cat ')[1] === undefined) {
          process.stdout.write(`Invalid input. If you want to read directory, please type cat filename\n`);
          break;
        }
        read(text.split('cat ')[1]);
        break;
      default:
        process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
        console.log('Invalid input');
        console.log('Try again: ');
        break;
    }
  });

  process.on('exit', () => process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`));
};

startManager();

import { createInterface } from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import * as fs from 'fs';
import read from './read.mjs';
import ls from './ls.mjs';
import add from './add.mjs';
import rn from './rn.mjs';
import cp from './cp.mjs';
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
      case 'add':
        if (text.split('add ')[1] === undefined) {
          process.stdout.write(`Invalid input. If you want to add new file, please type add filename\n`);
          break;
        }
        add(text.split('add ')[1]);
        break;
      case 'rn':
        if (text.split(' ')[1] === undefined || text.split(' ')[2] === undefined) {
          process.stdout.write(`Invalid input. If you want to rename new file, please type rn filename newname\n`);
          break;
        }
        rn(text.split(' ')[1], text.split(' ')[2]);
        break;
        case 'cp':
          if (text.split(' ')[1] === undefined || text.split(' ')[2] === undefined) {
            process.stdout.write(`Invalid input. If you want to copy a file, please type copy filename dirname\n`);
            break;
          }
          cp(text.split(' ')[1], text.split(' ')[2]);
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

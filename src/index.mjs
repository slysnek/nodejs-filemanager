import { createInterface } from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import * as fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentSysDirectory = homedir();

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
        console.log(currentSysDirectory);
        break;
      case 'cd':
        console.log('Moving to new directory...');
        console.log(text);
        currentSysDirectory = path.resolve(currentSysDirectory, text.split('cd ')[1])
        console.log('current sys dir --- ' + currentSysDirectory);
        break;
      case 'ls':
        fs.promises.readdir(currentSysDirectory).then((fileArray) => {
          for (const file of fileArray) {
            fs.stat(path.join(currentSysDirectory, file), (err, stats) => {
              if (err) {
                console.error(err);
              } else {
                if (stats.isFile()) {
                  console.log(
                    path.basename(file, path.extname(file)) +
                      ' - ' +
                      path.extname(file).slice(1) +
                      ' - ' +
                      (stats.size / 1024).toFixed(2) +
                      'KB'
                  );
                } else{
                  console.log(
                    path.basename(file) +
                      ' - ' + 'directory'
                  );
                }
              }
            });
          }
        });
        break;
      default:
        console.log(text);
        console.log(text.startsWith('cd'));
        console.log('Invalid input');
        console.log('Enter again: ');
        break;
    }
  });

  process.on('exit', () => process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`));
};

startManager();

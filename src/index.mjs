import { createInterface } from 'readline';
const rline = createInterface({
  input: process.stdin,
  output: process.stdout
})

const startManager = async () => {
  const args = process.argv.slice(2);
  const usernameArg = args
  .find((el) => {
    return el.startsWith('--username');
  })
  const username = usernameArg ? usernameArg.split('=')[1] : 'anonymous user'
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  process.stdout.write('Enter your command: ');
  rline.on('line', (text) => {
    if (text === '.exit'){
      process.exit();
    }
    console.log(text);
  });

  process.on('exit', () => process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`))
};

startManager();

const startManager = async () => {
  const args = process.argv.slice(2);
  const usernameArg = args
  .find((el) => {
    return el.startsWith('--');
  })
  const username = usernameArg ? usernameArg.split('=')[1] : 'anonymous user'
  process.stdout.write(`Welcome to the File Manager, ${username}!`);
};

startManager();

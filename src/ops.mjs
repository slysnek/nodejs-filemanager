import { currentSysDirectory } from './index.mjs';
import * as os from "node:os";

const ops = async (arg) => {
  console.log(arg);
  const argument = arg.slice(2)
  console.log(argument);
  console.log(argument === 'homedir');
  if(argument !== 'EOL' && argument !== 'cpus' && argument !== 'homedir' && argument !== 'username' && argument !== 'architecture'){
    process.stdout.write(`The argument is incorrect. Possible args: --EOL --cpus --homedir --username --architecture\n`);
    process.stdout.write(`You are currently in ${currentSysDirectory}\n`);
    return
  }
  switch (argument) {
    case 'EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case 'cpus':
      const cpus = ((os.cpus()));
      console.log(`CPU count: ${cpus.length}, CPU model: ${cpus[0].model}`)
      cpus.forEach((el,index) => {
        console.log(`Speed of core #${index+1} ${(el.speed / 1000 )}GHz`);
      });
      break;
    case 'homedir':
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case 'username':
      console.log(`Username: ${os.userInfo().username}`);
      break;
    case 'architecture':
      console.log(`CPU Architecture: ${process.arch}`);
      break;
  
    default:
      break;
  }

};

export default ops;

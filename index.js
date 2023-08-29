import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { execSync } from 'child_process';

function runCommand(cmd) {
    try {
      const output = execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to execute command:', cmd);
    }
  }

const argv = yargs(hideBin(process.argv)).argv;

if (argv.start) {
    runCommand("start /B node src/recurrance.js");
}

if (argv.stop) {
    runCommand("taskkill /IM tvmc.exe /F");
}

if (argv.refresh) {
    runCommand("node modules/query.js");
}

if (argv.init) {
    runCommand("npm-run-all -s init-myini init-db -p start-db -s init-password init-database init-table");
}

if (argv['start-db']) {
    runCommand('cd mysql/bin && start /B mysqld');
}

if (argv['stop-db']) {
    runCommand('taskkill /IM mysqld.exe /F');
}

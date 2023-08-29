const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');

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
    runCommand('node src/init-myini.js');
    runCommand('cd mysql/bin && mysqld --initialize-insecure');
    runCommand('cd mysql/bin && start /B mysqld');
    runCommand('node src/init-password.js');
    runCommand('node src/init-database.js');
    runCommand('node src/init-table.js');
}

if (argv['start-db']) {
    runCommand('cd mysql/bin && start /B mysqld');
}

if (argv['stop-db']) {
    runCommand('taskkill /IM mysqld.exe /F');
}

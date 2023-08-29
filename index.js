const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');
const http = require('http');
const { runAndWait } = require('./modules/runAndWait.js');
const { query } = require('./modules/query.js');

function runCommand(cmd) {
    try {
      const output = execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to execute command:', cmd);
    }
  }

const argv = yargs(hideBin(process.argv)).argv;

if (argv.start) {
    runAndWait();
}

if (argv.stop) {
    runCommand("taskkill /IM vorne-query.exe /F");
}

if (argv.refresh) {
    query();
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
    const request = http.request({
        hostname: 'localhost',
        port: 3306,
        method: 'GET'
    }, (response) => {
        console.log('Received a response, which is unexpected. Database might already be started.');
    }).on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('Connection refused, attempting to start MySQL...');
            runCommand('cd mysql/bin && start /B mysqld');
        } else {
            console.log('Some other error:', err);
        }
    });
    request.end();
}

if (argv['stop-db']) {
    runCommand('taskkill /IM mysqld.exe /F');
}

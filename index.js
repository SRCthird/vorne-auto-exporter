const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');
const net = require('net');
const { runAndWait } = require('./modules/runAndWait.js');
const { query } = require('./modules/query.js');

function runCommand(cmd) {
    try {
        const output = execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to execute command:', cmd);
    }
}

yargs(hideBin(process.argv))
    .scriptName("vorne-query")
    .command({
        command: 'mysql-start',
        describe: 'Start the MySQL service',
        handler: () => {
            const client = new net.Socket();

            client.connect(3306, 'localhost', () => {
                console.log('Database is already started.');
                client.end();
            });

            client.on('error', (err) => {
                if (err.code === 'ECONNREFUSED') {
                    console.log('Starting MySQL service...');
                    runCommand('cd mysql/bin && start /B mysqld');
                } else {
                    console.log('Error:', err);
                    console.log('Attempting to start MySQL service...');
                    runCommand('cd mysql/bin && start /B mysqld');
                }
            });
        }
    })
    .command({
        command: 'mysql-stop', 
        describe: 'Stop the MySQL service', 
        handler: () => {
            console.log('Stopping MySQL service...');
            runCommand(`cd mysql/bin && mysqladmin -u root -p shutdown`);
        }
    })
    .command({
        command: 'start', 
        describe: 'Start the query loop', 
        handler: () => {
            console.log('Starting query loop...');
            runAndWait();
        }
    })
    .command({
        command: 'refresh', 
        describe: 'Refresh the data', 
        handler: () => {
            console.log('Refreshing data...');
            query();
        }
    })
    .command({
        command: 'init', 
        describe: 'Initialize the program', 
        handler: () => {
            console.log('Initializing program...');
            runCommand('npm i');
            runCommand('node src/init-myini.js');
            runCommand('cd mysql/bin && mysqld --initialize-insecure');
            runCommand('cd mysql/bin && start /B mysqld');
            runCommand('node src/init-password.js');
            runCommand('node src/init-database.js');
            runCommand('node src/init-table.js');
        }
    })
    .command({
        command: 'login',
        describe: 'Log into the MySQL database',
        handler: () => {
            console.log('Logging in...');
            runCommand('cd mysql/bin && mysql -u root -p');
        }
    })
    .version('1.0.0')
    .demandCommand(1, 'You need at least one command before moving on')
    .strict()
    .help()
    .argv;

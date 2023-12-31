const fs = require('fs');
const path = require('path');

const currentModulePath = __dirname;
const root = path.join(currentModulePath, '..');

const basedir = path.join(root, 'mysql');
const datadir = path.join(basedir, 'data');
const myini = path.join(basedir, 'bin\\my.ini');

const myIniConfig = `[mysqld]
skip-eventlog
basedir=${basedir}
datadir=${datadir}
port = 3306
`;

fs.writeFile(myini, myIniConfig, (err) => {
  if (err) {
    console.error(`An error occurred while writing the my.ini file: ${err}`);
  } else {
    console.log(`my.ini file has been created successfully at ${myini}`);
  }
});
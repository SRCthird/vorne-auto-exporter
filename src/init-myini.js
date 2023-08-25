import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the path to the my.ini file in the project directory
const currentModulePath = path.dirname(fileURLToPath(import.meta.url));
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

// Write the content to the my.ini file
fs.writeFile(myini, myIniConfig, (err) => {
  if (err) {
    console.error(`An error occurred while writing the my.ini file: ${err}`);
  } else {
    console.log(`my.ini file has been created successfully at ${myini}`);
  }
});
const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const { getPassword } = require('../modules/getPassword.js')

const schemaFile = 'schema.yaml';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: getPassword()
};

async function createDatabases(databaseList) {
    for (let database of databaseList) {
        const connection = await mysql.createConnection(connectionConfig);
        try {
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
            console.log(`${database} created or already exists.`);
        } catch (err) {
            console.error(`Error creating database ${database}:`, err);
        } finally {
            await connection.end();
        }
    }
}

function getDatabaseNamesFromSchema() {
    try {
        const fileContents = readFileSync(schemaFile, 'utf8');
        const data = load(fileContents);

        const databaseNames = [];
        for (let ip in data.Database) {
            databaseNames.push(data.Database[ip].Name);
        }

        return databaseNames;
    } catch (e) {
        console.error('Error reading the schema file:', e);
        return [];
    }
}

async function main() {
    const databaseList = getDatabaseNamesFromSchema();
    await createDatabases(databaseList);
}

main();

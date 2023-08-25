import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const schemaFile = 'schema.yaml';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: getPasswordFromFile()
};

function getPasswordFromFile() {
    const data = JSON.parse(readFileSync('password.json', 'utf8'));
    return data.password;
}

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

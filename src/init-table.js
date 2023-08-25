import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const schemaFile = 'schema.yaml';

function getPasswordFromFile() {
    const data = JSON.parse(readFileSync('password.json', 'utf8'));
    return data.password;
}

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: getPasswordFromFile()
};

function getColumnDefinition(columnType) {
    switch (columnType) {
        case 'PKint':
            return 'INT PRIMARY KEY';
        case 'int':
            return 'INT';
        case 'str':
            return 'VARCHAR(255)';
        case 'formatTime':
            return 'DATETIME';
        case 'float':
            return 'DECIMAL(10,2)';
        default:
            return 'VARCHAR(255)';
    }
}

async function createTablesForDatabase(databaseName, tablesData) {
    const connection = await mysql.createConnection({
        ...connectionConfig,
        database: databaseName
    });

    const streamTables = tablesData.Streams;
    
    for (let [tableName, tableData] of Object.entries(streamTables)) {
        if (!tableData.columns) {
            console.error(`No columns defined for table ${tableName} in database ${databaseName}. Skipping table creation.`);
            continue;
        }
        let columnDefinitions = [];
        for (let [columnName, columnType] of Object.entries(tableData.columns)) {
            columnDefinitions.push(`${columnName} ${getColumnDefinition(columnType)}`);
        }
        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions.join(', ')})`;
        
        try {
            await connection.query(createTableSQL);
            console.log(`Table ${tableName} created or already exists in ${databaseName}.`);
        } catch (err) {
            console.error(`Error creating table ${tableName} in ${databaseName}:`, err);
        }
    }

    await connection.end();
}

async function main() {
    const schema = load(readFileSync(schemaFile, 'utf8'));

    for (let ipAddress in schema.Database) {
        const databaseData = schema.Database[ipAddress];
        await createTablesForDatabase(databaseData.Name, databaseData.Tables);
    }
}

main();
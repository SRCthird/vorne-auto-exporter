const fs = require('fs');
const yaml = require('js-yaml');
const { processQuery } = require('./processQuery.js');

async function query() {
    const fileContent = fs.readFileSync('schema.yaml', 'utf8');

    const config = yaml.load(fileContent);

    for (const [database, content] of Object.entries(config['Database'])) {
        console.log(`Processing on server ${database}`);

        const Database = config['Database'][database];
        for (const Table of Object.keys(Database['Tables']['Streams'])) {
            processQuery(Database, database, Table);
        }
    }
}

module.exports = { query };

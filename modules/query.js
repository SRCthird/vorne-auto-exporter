const fs = require('fs');
const yaml = require('js-yaml');
const processQuery = require('./processQuery.js');

async function query() {
    // Read the schema.yaml file
    const fileContent = fs.readFileSync('schema.yaml', 'utf8');

    // Parse the YAML content
    const config = yaml.load(fileContent);

    for (const [database, content] of Object.entries(config['Database'])) {
        console.log(`Processing on server ${database}`);

        const Database = config['Database'][database];
        // Process each table in the Stream section
        for (const Table of Object.keys(Database['Tables']['Streams'])) {
            processQuery(Database, database, Table);
        }
    }
}

module.exports = query;

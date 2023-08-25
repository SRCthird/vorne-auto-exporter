const query = require('query');
import Mapping from './mapping.js';
const mysql = require('mysql');

const processQuery = (Database, server, Table) => {
    console.log(`Processing ${Table}`);

    const Limit = 100

    const mapping = new Mapping();

    const Columns = Object.keys(Database['Tables']['Streams'][Table]['columns']);

    const columnTransformationsMap = {
        'int': int,
        'float': float,
        'str': str,
        'formatTime': formatTime,
        'mapping.state': mapping.state,
        'mapping.reason1': mapping.reason1,
        'mapping.reason2': mapping.reason2,
        'mapping.reason3': mapping.reason3,
        'mapping.reason4': mapping.reason4,
        'mapping.reason5': mapping.reason5,
        'mapping.reason6': mapping.reason6,
        'mapping.error_code': mapping.error_code,
        'mapping.channel_state': mapping.channel_state,
        'mapping.process_timer_state': mapping.process_timer_state,
        'mapping.production_state': mapping.production_state,
        'mapping.production_state_internal': mapping.production_state_internal,
        'mapping.tcp_state': mapping.tcp_state,
        'mapping.toggle_switch': mapping.toggle_switch,
        'mapping.digital_display': mapping.digital_display,
        'mapping.run_mode': mapping.run_mode,
        'mapping.serial_mode': mapping.serial_mode,
        'mapping.sink_source': mapping.sink_source,
        'mapping.display_type': mapping.display_type,
        'mapping.event_type': mapping.event_type
    }

    const columnTransformations = Columns.map(column => columnTransformationsMap[Database['Tables']['Streams'][Table]['columns'][column]]);

    const debug = false;
    const raw = false;

    const columnsString = Columns.join(', ');
    const sqlStatement = `SELECT ${columnsString} FROM ${Table} ORDER BY ${Columns[0]} DESC LIMIT ${Limit};`;

    const resultQuery = query(server, sqlStatement, columnTransformations, debug, raw);

    console.log(resultQuery);
 /*   
    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '$TephenC03',
        database: Database['Name']
    });

    connection.connect();

    // Inserts the result, line by line, into the database
    resultQuery.forEach(row => {
        const placeholders = Columns.map(() => '?').join(', ');
        const columnsString = Columns.join(', ');
        const updateString = Columns.map(column => `${column} = VALUES(${column})`).join(', ');

        // If there's a duplicate key the old values will be overwritten
        const insertQuery = `INSERT INTO ${Table} (${columnsString}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updateString};`;

        connection.query(insertQuery, row, (err, results) => {
            if (err) {
                console.error('Failed to insert:', err);
            }
            // ... any other handling, like logging successful insertions ...
        });
    });

    connection.end();
*/
}

export default processQuery;
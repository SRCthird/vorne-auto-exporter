import { useQuery } from './useQuery.js';
import { Mapping } from './mapping.js';
import mysql from 'mysql';

export const processQuery = async (Database, server, Table) => {

    function formatTime(timestamp) {
        const baseDate = new Date(1900, 0, 1);
        const secondsToAdd = parseFloat(timestamp);
        baseDate.setSeconds(baseDate.getSeconds() + secondsToAdd);
        return baseDate;
    }

    console.log(`Processing ${Table}`);

    const Limit = 100

    const mapping = new Mapping();

    const Columns = Object.keys(Database['Tables']['Streams'][Table]['columns']);

    const columnTransformationsMap = {
        'PKint': parseInt,
        'int': parseInt,
        'float': parseFloat,
        'str': String,
        'formatTime': formatTime,
        // set all mapping types here:
        // 'mapping.<name>': mapping.<name>.bind(mapping),
        'mapping.state': mapping.state.bind(mapping),
        'mapping.reason1': mapping.reason1.bind(mapping),
        'mapping.reason2': mapping.reason2.bind(mapping),
        'mapping.reason3': mapping.reason3.bind(mapping),
        'mapping.reason4': mapping.reason4.bind(mapping),
        'mapping.reason5': mapping.reason5.bind(mapping),
        'mapping.reason6': mapping.reason6.bind(mapping),
        'mapping.error_code': mapping.error_code.bind(mapping),
        'mapping.channel_state': mapping.channel_state.bind(mapping),
        'mapping.process_timer_state': mapping.process_timer_state.bind(mapping),
        'mapping.production_state': mapping.production_state.bind(mapping),
        'mapping.production_state_internal': mapping.production_state_internal.bind(mapping),
        'mapping.tcp_state': mapping.tcp_state.bind(mapping),
        'mapping.toggle_switch': mapping.toggle_switch.bind(mapping),
        'mapping.digital_display': mapping.digital_display.bind(mapping),
        'mapping.run_mode': mapping.run_mode.bind(mapping),
        'mapping.serial_mode': mapping.serial_mode.bind(mapping),
        'mapping.sink_source': mapping.sink_source.bind(mapping),
        'mapping.display_type': mapping.display_type.bind(mapping),
        'mapping.event_type': mapping.event_type.bind(mapping)
    }

    const columnTransformations = Columns.map(column => columnTransformationsMap[Database['Tables']['Streams'][Table]['columns'][column]]);

    const debug = false;
    const raw = false;

    const columnsString = Columns.join(', ');
    const sqlStatement = `SELECT ${columnsString} FROM ${Table} ORDER BY ${Columns[0]} DESC LIMIT ${Limit};`;

    const resultQuery = await useQuery(server, sqlStatement, columnTransformations, debug, raw);
    
    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'aragorn',
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
        });
    });

    connection.end();
}

export default processQuery;
const axios = require('axios');

async function useQuery(server, sqlStatement, columnTransformations, debug = false, raw = true) {
    let resultQuery = [];

    const url = `http://${server}/sql-request.do`;
    const responseType = 'application/json';
    const payload = `response_type=${responseType}&sql_statement=${sqlStatement}`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': payload.length.toString()
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        if (debug) {
            console.log(`Method: ${response.config.method.toUpperCase()}`);
            console.log(`Headers: ${JSON.stringify(response.config.headers)}`);
            console.log(`Body: ${response.config.data}`);
        }
        if (response.status !== 200) {
            console.log(`Error: ${response.status}, ${response.statusText}`);
            return [];
        }
        const data = response.data;
        const error = data[0].error;
        if (error) {
            console.log(`Error: ${error}`);
            return [];
        }
        const records = data[0].data;
        for (const record of records) {
            if (!raw) {
                for (const [colIdx, transformation] of Object.entries(columnTransformations)) {
                    record[colIdx] = transformation(record[colIdx]);
                }
            }
            resultQuery.push(record);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }

    return resultQuery;
}

module.exports = { useQuery };



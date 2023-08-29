const axios = require('axios');

async function useQuery(server, sqlStatement, columnTransformations, debug = false, raw = true) {
    // Set resultQuery to an empty array
    let resultQuery = [];

    // Defines the target URL
    const url = `http://${server}/sql-request.do`;

    // Defines the response type to JSON
    const responseType = 'application/json';

    // Create the payload using the key=value format
    const payload = `response_type=${responseType}&sql_statement=${sqlStatement}`;

    // Set the content-type header to application/x-www-form-urlencoded
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': payload.length.toString()
    };

    try {
        // Make the request to the target URL using the query string
        const response = await axios.post(url, payload, { headers: headers });

        if (debug) {
            console.log(`Method: ${response.config.method.toUpperCase()}`);
            console.log(`Headers: ${JSON.stringify(response.config.headers)}`);
            console.log(`Body: ${response.config.data}`);
        }

        // Check the response status code
        if (response.status !== 200) {
            console.log(`Error: ${response.status}, ${response.statusText}`);
            return [];
        }

        // Get the response data or error message
        const data = response.data;
        const error = data[0].error;

        // Check if there is an error
        if (error) {
            console.log(`Error: ${error}`);
            return [];
        }

        // Get the records from the JSON response
        const records = data[0].data;

        // Transform the records using the columnTransformations array
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



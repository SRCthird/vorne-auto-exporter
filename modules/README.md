# Modules

## Introduction

These are the files that are called and run during normal running of the program. This documentation will go over troubleshooting, updating and functions of the sorce files.

## Table of Contents

1.
2.
3.
4.
5.
6.

## Query Executor
[query.js](./query.js)

A script to execute queries to the vorne database using the YAML schema file.

### Requirements:
   - `fs`: From Node.js standard library.
   - `js-yaml`: For YAML parsing.
   - `processQuery`: from [`./processQuery.js`](./processQuery.js).

### Features:
1. Reads the YAML file named [`schema.yaml`](/schema.yaml).
2. Parses the YAML file content to identify databases and their associated tables.
3. Processes queries using the `processQuery` function for each table found in the YAML.
4. Handles most if not all errors.

### Usage:
1. Prepare a `schema.yaml` file according to the expected format.
2. Run the following command to complete one cycle of data collection for a quick refresh:
```bash
vorne-query refresh
```
3. Run this command to start the automated collection loop:
```bash
vorne-query start
```

### Yaml:
- Modify the `schema.yaml` file as required to add more databases and tables.
- Make sure your YAML schema follows the correct format to avoid runtime errors. See #5 of [database setup](/README.md#database-setup) for more information.

### Notes:
- The script assumes that there is only one level of `[Database]` and will only process tables under the `[Streams]` key.
- The logging is minimal. Consider adding more logs or error handlers for better clarity and debugging.
- Ensure the proper configuration of `processQuery.js` as it is a critical component for processing the queries.

## Looped Query Spinner
[runAndWait.js](./runAndWait.js)

### Requirements:
- Node.js, or the executable file installed on your machine.
- The associated [`query.js`](./query.js) module which should be located in the same directory.

### Features:
- Executes a query using the `query` function from the `query.js` module.
- Displays a rotating spinner in the console, indicating that the program is waiting.
- The spinner rotates every 200ms, cycling through the characters: `|`, `/`, `-`, and `\`.
- The waiting period is approximately 24 hours (24 * 60 * 60 * 1000 milliseconds) after which the query will be executed again.
- A message `Hit ctl+c to end the loop.` is shown to inform the user how to stop the loop.
- Once the waiting period is over, a message `Done waiting!` will be displayed, and the loop restarts.

### Usage:
2. Run the script with the command:
   ```bash
   vorne-query start
   ```
3. You should see the spinner in action after the query has been executed.
4. To stop the loop at any time, press `ctl+c`.

### Notes:
- Do not close the command prompt window, unless you are ready to stop the loop.
- This script continually runs and re-executes the query function from `query.js` approximately every 24 hours.
- Make sure to handle any possible errors or exceptions in the `query` function to prevent unwanted interruptions during execution.

## Mapping Class
[mappping.js](./mapping.js)

The Mapping class provides utility functions to map numeric codes to human-readable strings for different categories. You will be able to add custom functions to this class.

### Requirements:

- No dependencies are needed for this file.

### Features:

- Convert computer generated code to integers and maps them to human readable strings.
- Convert codes to string representations like "Fatal", "Non Fatal Error", and more.
- Add custom functions for mapping your columns.

### Usage:

1. Create a map with this format:
    - For int -> string:
        ```javascript
        // input: '15'
        // output: 'String 15'
        serial_mode(input) {
            // Some databases hold everything as a string, so we use parseInt() just in case.
            const parsedInput = parseInt(input, 10);
            const mapping = {
                0: 'String 1',
                1: 'String 2',
                15: 'String 15'
            }
            // Converts the integer to its respective string or outputs 'unknown' if not found.
            return mapping[parsedInput] || 'unknown';
        }  
        ```
    - For other transformations:
        ```javascript
        // input: 'H4k8Z'
        // output: 'String 15'
        serial_mode(input) {
            // This map uses set strings to be output as human readable strings.
            const mapping = {
                'G5c6V': 'String 1',
                'W3p0L': 'String 2',
                'H4k8Z': 'String 15',
                'B7e4Z': 'String 16'
            }
            // Converts the integer to its respective string or outputs 'unknown' if not found.
            return mapping[parsedInput] || 'unknown';
        }  
        ```
3. Add the custom mapping to the [processQuery.js](./processQuery.js) constant dictionary `columnTransformationsMap`.
    - see [Query Formatter Usage](#usage-3) for more information.

### Notes:

- The methods use a strict matching mechanism. If the provided code does not match any known mapping, the method will return 'unknown'.
- The preset methods rely on the `parseInt` function to ensure that the provided input is a valid integer. It's safe to provide input in the form of strings that represent integers. You can remove the `const parsedInput = parseInt(input, 10);` line if your maps don't contain integers.
- While this class provides a basic mechanism for code to string mapping, it might require additions or modifications based on the specific use case.
- Always check for the returned value of 'unknown' to ensure that the provided code is a valid one for the mapping or if it must be added.

## Query Formatter
[processQuery.js](./processQuery.js)

Process and transform data queries efficiently with the processQuery module.

### Requirements:
1. Node.js environment or executable.
2. MySQL server running with relevant tables. [see init](/README.md#)
3. Dependencies:
    * `useQuery`: Module from [`./useQuery.js`](./useQuery.js).
    * `Mapping`: Class from [`./mapping.js`](./mapping.js).
    * `MySQL`: For communication with the MySQL database.
    * `getPassword`: For gaining password from [password.json](/password.json).

### Features:
- **Dynamic Column Transformations**: Easily map columns and their transformations using the columnTransformationsMap.
- **Efficient Query Building**: Dynamically constructs the SQL statement to fetch the right columns.
- **Smart Inserts**: Inserts rows and, in the event of a duplicate key, updates the row.
- **Extensible Mapping Transformations**: Comes with predefined mapping functions, and you can easily add more mappings to suit your needs.

### Usage:

1. `processQuery` is a Module that pulls the data from [query.js](./query.js) and formats it into its respective datatype.
2. This is where you will add custom mapping functions that were created in the [mapping.js](./mapping.js) class.
3. To do so add the class name and function name to the list as shown below:
    - If we added a function `exceptions` to the mapping class this is how we would add it bellow:
    - Class name is mapping so to call it we say `mapping.exceptions`
    - Just saying mapping.exceptions may work but to be safe we bind it to the class using `mapping.exceptions.bind(mapping)`:
    ```javascript
    const columnTransformationsMap = {
        'PKint': parseInt,
        'int': parseInt,
        'float': parseFloat,
        'str': String,
        'formatTime': formatTime,
        // set all mapping types here:
        'mapping.exceptions': mapping.exceptions.bind(mapping)
    }
    ```
4. Lastly the Query Formatter sends the data to the local MySQL database.
    - This will overwrite any existing entries of the same primary key, so you don't have to worry about duplicate data:
    ```SQL
    INSERT INTO table (columns) 
    VALUES (values) 
    ON DUPLICATE KEY UPDATE (newValues);
    ```

### Notes:
- To add more mapping types or data transformations, update the [`columnTransformationsMap`](./processQuery.js#L23) dictionary.
- This module assumes a MySQL database is available on `localhost`. Ensure the server and database details are correctly set up.
- The module uses the `getPassword` function to retrieve the MySQL password. Ensure it's set up and returns the correct password.

## HTTP-SQL Webhook

### Requirements:
- Node.js environment or executable file.
- `Axios` is used to connect to the target server.

### Features:
- Easy querying of remote SQL servers via HTTP.
- Supports debugging mode to view request and response details.
- Ability to transform result columns with custom functions.
- Returns raw data or transformed data based on user preference.

### Usage:

-The main purpose of the useQuery function is to make a remote SQL query via HTTP and fetch the result. Here's how it operates:
    - It constructs the request URL using the provided server parameter.
    - Prepares the payload using the provided SQL statement and sets the response type to application/json.
    - A POST request is made to the server using axios with the prepared payload and headers.
    - If the debug parameter is true, details about the request and its headers are logged to the console.
    - The function checks the response status. If it's not 200 (OK), it logs an error and returns an empty array.
    - The response is expected to be an array, with the first element containing either error details or data. If there's an error in the response, it's logged to the console and the function returns an empty array.
    - If the raw parameter is set to false, the function will apply the provided column transformations to the result set. This is useful if you need to process or format the results before using them.
    - The processed records are added to the resultQuery array which is then returned.

- **Parameters**:
   - `server`: The domain or IP of your remote SQL server.
   - `sqlStatement`: The SQL statement you want to execute.
   - `columnTransformations`: An object that maps column indexes to transformation functions. These functions are applied to the column's value in the result set.
   - `debug` (optional): If set to `true`, will log request and response details for debugging purposes. Default is `false`.
   - `raw` (optional): If set to `true`, results are returned as received. If set to `false`, results undergo column transformations. Default is `true`.

### Notes:

- Due to the nature of Vorne XL the target server will only accept SELECT statements.
- Always ensure that the SQL statements do not expose sensitive information.
- Ensure that your Vorne server has CORS (Cross-Origin Resource Sharing) enabled if you're making requests from a different origin.
- Error handling is implemented to catch common issues, but further enhancements can be made depending on the specific requirements and server responses.
- Transformations are applied sequentially based on the order in the `columnTransformations` object. Ensure that transformations are not conflicting.

## Password Retriever

### Requirements:
1. Node.js installed in your environment.
2. A `password.json` file in the root directory of your project. This file should contain an object with a `password` key.
   
Example of `password.json` format:
```json
{
    "password": "your_password_here"
}
```

### Features:
- Retrieve passwords securely from a local JSON file.
- Uses Node.js built-in `fs` module for reading files.
- Easy integration into other Node.js applications.

### Usage:
- Usage is fairly simple. It just looks at [password.json](/password.json) and returns the value.
- This module reads the password as plain text from the JSON file.
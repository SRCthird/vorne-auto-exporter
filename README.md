# Vorne XL Data Collector and Formatter

This program is designed to fetch data from a Vorne XL database, process the information, and then store it in a MySQL database. It provides both automated and manual methods to retrieve and update the data.

Due to the nature of this application, the data located in the MySQL database is for reference purposes only and should not be considered raw data. 

## Prerequisites

* Node.js and NPM v18.5.0 (optional)
* [MySQL server v 8.0.28](https://downloads.mysql.com/archives/community/)

## Installation

1. Clone the repository to a local machine:
```bash
git clone https://github.com/SRCthird/vorne-auto-exporter.git
```
2. Navigate to the project directory:
```bash
cd vorne-auto-exporter
```

## Database Setup

1. Install the required version of [MySQL](https://downloads.mysql.com/archives/community/).

2. Extract the .zip file to the project directory, and rename the folder mysql.

3. Initialize the MySQL database:
```bash
vorne-query init
```
4. You will be prompted to enter a password, this will be saved and used in all automation accessing the MySQL server. Make it easy to remember but hard to guess.

5. Create schema.yaml file:<br>
    The program will pull the data with a yaml architecture of the following format:
    ```yaml
    Database:
        <ipaddress>
            Name: <name of database> # Will be the name of the database in MySQL
            Tables: 
                Registers: # These tables are just for reference and won't be pulled
                    <table1>
                        columns:
                            <column1>: <datatype>
                            <column2>: <datatype>
                Streams: # The tables that will be pulled and stored in MySQL
                    <table2>
                        columns:
                            <column1>: <datatype>
                            <column2>: <datatype>
                    <table3>
                        columns:
                            <column1>: <datatype>
                            <column2>: <datatype>
    ```

## Data Types
These are the data types that are set up to be used in the Schema.yaml file:
1. `str`: Strings are transformed into VARCHAR(255)
2. `PKint`: This is the primary key for the table. It will be an integer.
3. `int`: Integer
4. `float`: Floats will be converted to DECIMAL(10, 2)
5. `formatTime`: DateTime. this will call the formatTime function and transform the string to DateTime.
6. `mapping.<function>`: These will be custom mapping functions. See [Mapping](./modules/mapping.js) for mapping functions.

**Mapping**
Creating custom mapping functions can be done in the [Mapping](./modules/mapping.js) class. After creating a custom map, add it to [processQuery](./modules/processQuery.js#L22)

## Usage

* command help:
  This will display all available commands for vorne-query.
```bash
vorne-query help
```

* **Automated Data Collection** 
  The program is set up to automatically fetch and process data from the Vorne XL database servers every 24 hours. To start this service, run:
```bash
vorne-query start
```
* **Manual Data Refresh**
  If you need to manually update the data and don't want to restart the loop, use:
```bash
vorne-query refresh
```

## Configuration

Before starting, ensure you update the [schema.yaml](/README.md#L37) and [initialize](/README.md#L29) the program.

**You will need the following:**
* Vorne XL database credentials and endpoint
* MySQL database credentials and settings

## Troubleshooting

If you encounter issues while using the script, here are some common troubleshooting steps you can follow:

1. **Connection Issues**:
    - **Error**: Cannot connect to the MySQL server.
        - **Solution 1**: Ensure your MySQL server is running and listening on the specified host and port. Check your firewall settings to ensure it's not blocking the connection.
        - **Solution 2**: Check task manager. If mysql.exe is running but you are unable to connect due to an error that isn't 'Access Denied', end the task in task manager and run the server again.

    - **Error**: Authentication failure.
        - **Solution**: Double-check the username and password. Ensure the [`getPassword.js`](/modules/getPassword.js) module is returning the correct password. The root user should have the necessary permissions to create databases.

2. **Schema File Issues**:
    - **Error**: Cannot read the `schema.yaml` file.
        - **Solution**: Ensure the file is present in the correct directory and the Node.js process has the necessary permissions to read the file.

    - **Error**: Invalid YAML structure.
        - **Solution 1**: Validate your `schema.yaml` file's format. You can use online YAML validators to help spot any syntax errors.
        - **Solution 2**: Ensure the file architecture is correctly set. See #5 of [database setup](/README.md#database-setup) for more details.

3. **Database Creation Issues**:
    - **Error**: Cannot create a specific database.
        - **Solution**: Ensure the database name doesn't contain any special characters or spaces that might be causing the issue. Also, make sure the user has the correct permissions to create databases.

4. **Dependency Issues**:
    - **Error**: Missing module errors.
        - **Solution**: Run `npm install` or `yarn install` to ensure all dependencies are correctly installed.

    - **Error**: Version conflict errors.
        - **Solution**: Check `package.json` for the versions of the modules being used and consider updating or rolling back to a stable version if needed.

5. **Authentication Issues**:
    - **Error**: MySQL is inaccessible on initialization.
        - **Solution 1**: Ensure that the initial configuration of your MySQL server allows root connections without a password. You can check this by looking at [index.js](/index.js#L72). It should initialize your MySQL server as `--initialize-insecure`. If this was changed you may have to repackage index.js into an executable again.
        - **Solution 2**: Recreating the database. If you are unable to initialize your database and have not added any data yet, delete the [data](/mysql/data/) folder in mysql and reinitialize the program. 

    - **Error**: Access denied to the MySQL database after initialization.
        - **Solution**: Ensure that any password changes after initialization are recorded in password.json.

6. **General Troubleshooting Tips**:
    - **Environment**: Ensure your Node.js environment is correctly set up and all global dependencies (like MySQL) are properly installed.
    - **Permissions**: Ensure the script has necessary permissions. Sometimes the issues might be because the script cannot access certain directories or files.

If you still face issues, consider reaching out to community forums or checking the official documentation of the libraries used in the script for more insights.

## Disclaimer

By using this application, you acknowledge and agree to the following:

1. `Data Transformation`: This application extracts raw data from a source database and reformats it into human-readable strings in a new, separate database. The data presented in the new database is the result of this transformation process and should be considered for `reference purposes only`.  Due to the nature of this application the data in this separate database should **not** be considered as raw data.

2. `Accuracy and Completeness`: While every effort is made to ensure the accuracy of the transformed data, due to potential software bugs, errors in the source data, or other unforeseen issues, the developer cannot guarantee that the data in the new database will be 100% accurate or complete. Users should exercise caution and verify critical information from original or alternative sources.

3. `No Warranty`: This application is provided "as is" without any warranties of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

4. `Limitation of Liability`: In no event shall the developer of this application be liable for any damages, including but not limited to direct, indirect, special, incidental, or consequential damages, arising out of or in connection with the use or performance of this application, even if they have been advised of the possibility of such damages.

## Learn more

* [Vorne.com](https://www.vorne.com/products/xl/)
* [MySQL.com](https://dev.mysql.com/doc/)
* [Nodejs.com](https://nodejs.org/docs/latest-v18.x/api/)

## License 

[ISC](/LICENSE)

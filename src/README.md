# Sorce Files

These are the files that are called and run on initialization of the program. This documentation will go over troubleshooting, updating and functions of the sorce files.

## Library

1. [init-password.js](#mysql-root-password-setter)
1. [init-myini.js](#mysql-configuration-file-generator-init-myinijs)
1. [init-database.js](#mysql-database-creator-init-databasejs)
1. [init-table.js](#my)
1. [Troubleshooting](#troubleshooting)

## MySQL Root Password Setter

A simple script to set the password of the `root` MySQL user on localhost and save it to a local file.

### Requirements
1. `mysql2` npm package
2. `readline-sync` npm package

### Features

- Connects to a MySQL server running on localhost using the `root` user.
- Prompts the user to input a new password for the `root` user.
- Saves the new password to a local JSON file named `password.json`.
- Changes the password for the `root` user to the newly provided one.

### Usage

1. Make sure you have Node.js and npm installed or the correct version of the exe file.
2. Install required packages using npm.
3. Run the initialization command.
4. Follow the prompts and enter a new password for the MySQL root user.

### Note

- The script uses the `mysql_native_password` plugin for authentication.
- Ensure you have the necessary permissions to alter the MySQL user's password.
- This script assumes that the `root` user can initially connect without a password.
- For security purposes, handle the generated `password.json` with care.

## MySQL Configuration File Generator (init-myini.js)

This script is for automatically generating the `my.ini` configuration file for MySQL, based on the relative directory structure.

### How It Works:

1. The code begins by importing necessary modules from the Node.js core library, namely `fs` (File System) for file operations and `path` for path manipulations.

2. The `currentModulePath` holds the directory path of the currently executing script.

3. The script sets up key directory paths relative to the root project:
- `root`: The root directory of our project.
- `basedir`: The main MySQL installation directory.
- `datadir`: The directory where MySQL stores its data.
- `myini`: The path to the `my.ini` configuration file that the script will generate.

4. A configuration template (`myIniConfig`) is defined, populated with necessary MySQL settings including the `basedir`, `datadir`, and a static port value (`3306`).

5. The script attempts to write the generated configuration to the `my.ini` file. If the operation is successful, a success message is logged; if an error occurs, the error is logged.

### Usage:

1. Ensure you have all the dependencies installed.
2. Upon successful execution, the `my.ini` file will be generated in the appropriate location with the provided configurations.

### Expected File Structure:

mysql should be in the root directory with the name **mysql**
```
root/
├── modules/
├── mysql/
│   ├── bin
│   ├── data
│   └── ...
├── node_modules/
├── src/
└── ...
```

### Note:

- This script assumes the existence of a directory structure with a root directory and a `mysql` directory within it. Ensure that the folder structure matches the expected paths before running the script.
- This file must not be run on its own, this file is to be run with the executable init command.

## MySQL Database Creator (init-database.js)

This script helps in automatically creating databases using MySQL. The names of the databases are extracted from a schema defined in a YAML file.

### Features:
1. **Connection Configuration**: Uses the `mysql2/promise` library to establish a connection to your MySQL server.
2. **YAML Schema**: Extracts database names from a YAML schema file.
3. **Error Handling**: Robust error handling in case of issues with database creation or reading the schema.

### Dependencies:
- `mysql2/promise`: For creating a promise-based connection with MySQL.
- `js-yaml`: To load and parse the schema file written in YAML.
- `fs`: Native Node.js module for reading files.

### Usage:
1. Ensure you have all the dependencies installed.
2. Update the `schema.yaml` with the structure defining the database names you wish to create.
3. Execute the init script.

### Expected Schema Structure:

The `schema.yaml` file should follow the below structure:

```yaml
Database:
    [IP_ADDRESS]:
        Name: [DATABASE_NAME]
    ...
```
- `IP_ADDRESS`: The IP address of the database.
- `DATABASE_NAME`: The name of the database where tables need to be placed in MySQL.

### Connection Configuration:

By default, the script connects to MySQL server running on `localhost` using the user `root`. The password is obtained from a separate module called `getPassword.js`. Ensure this module returns the correct password.

### Notes:
- It's crucial to have the correct permission for the MySQL user to create databases.
- Always take precautions while handling database passwords.
- This file must not be run on its own, this file is to be run with the executable init command.

## MySQL Table Creation Script (init-table.js)

This script facilitates the creation of tables in a MySQL database using the YAML schema. The script reads the `schema.yaml` file to generate and execute the required SQL statements.

### Features:
- Parses the table schema from a `schema.yaml` file.
- Supports multiple column types: PKint (integer primary key), int, str (string), formatTime (datetime) and float (decimals).
- Connection parameters can be easily configured for different MySQL databases.
- Utilizes error handling for **robustness**, particularly when creating tables.

### Dependencies:
- `mysql2/promise`: To connect to the MySQL database and execute asynchronous queries.
- `js-yaml`: For loading and parsing the YAML file.
- `fs`: To read the `schema.yaml` file.

### Usage:
1. Ensure you have the required dependencies installed.
2. Create and configure your `schema.yaml` file according to your desired database tables schema.
3. Configure the password during the initialization process.
    a. **Advanced**: Configure your database connection parameters (host, user, password).
4. Run the initialization script using the executable command.

### Expected Schema Structure:

The `schema.yaml` file should follow this format:

```yaml
Database:
    [IP_ADDRESS]:
        Name: [DATABASE_NAME]
        Tables:
        Streams:
            [TABLE_NAME]:
            columns:
                [COLUMN_NAME]: [COLUMN_TYPE]
                ...
    ...
```

- `IP_ADDRESS`: The IP address of the database.
- `DATABASE_NAME`: The name of the database where tables need to be placed in MySQL.
- `TABLE_NAME`: The name of the table to be created and pulled. Must match the target tables name.
- `COLUMN_NAME`: Name of the column in the table. Must match the target columns name.
- `COLUMN_TYPE`: Type of the column. See [data types](../README.md#data-types) for more information.

#### Example:

```yaml
Database:
  192.168.1.10:
    Name: My_Database
    Tables:
      Streams:
        ExampleStream:
          columns:
            sequence_number: PKint
            event_type: mapping.event_type
            event_id: mapping.error_code
            event_time: formatTime
            event_data: str
            global_sequence_number: int
```

### Note

- The password for the MySQL connection is retrieved using the `getPassword` function from the [`../modules/getPassword.js`](../modules/getPassword.js) module. Ensure you have this module set up and returning the correct password for your database.
- This scritp should only be run in the initialization process. Trying to run it after will result in an **Access Denied** error.

## Troubleshooting

If you encounter issues while using the script, here are some common troubleshooting steps you can follow:

1. **Connection Issues**:
- **Error**: Cannot connect to the MySQL server.
    - **Solution 1**: Ensure your MySQL server is running and listening on the specified host and port. Check your firewall settings to ensure it's not blocking the connection.
    - **Solution 2**: Check task manager. If mysql.exe is running but you are unable to connect due to an error that isn't 'Access Denied', end the task in task manager and run the server again.

- **Error**: Authentication failure.
    - **Solution**: Double-check the username and password. Ensure the [`getPassword.js`](../modules/getPassword.js) module is returning the correct password. The root user should have the necessary permissions to create databases.

2. **Schema File Issues**:
- **Error**: Cannot read the `schema.yaml` file.
    - **Solution**: Ensure the file is present in the correct directory and the Node.js process has the necessary permissions to read the file.

- **Error**: Invalid YAML structure.
    - **Solution 1**: Validate your `schema.yaml` file's format. You can use online YAML validators to help spot any syntax errors.
    - **Solution 2**: Ensure the file architecture is correctly set. See #5 of [database setup](../README.md#database-setup) for more details.

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
    - **Solution 1**: Ensure that the initial configuration of your MySQL server allows root connections without a password. You can check this by looking at [index.js](../index.js#L72). It should initialize your MySQL server as `--initialize-insecure`. If this was changed you may have to repackage index.js into an executable again.
    - **Solution 2**: Recreating the database. If you are unable to initialize your database and have not added any data yet, delete the [data](../mysql/data/) folder in mysql and reinitialize the program. 

- **Error**: Access denied to the MySQL database after initialization.
    - **Solution**: Ensure that any password changes after initialization are recorded in password.json.

6. **General Troubleshooting Tips**:
- **Environment**: Ensure your Node.js environment is correctly set up and all global dependencies (like MySQL) are properly installed.
- **Permissions**: Ensure the script has necessary permissions. Sometimes the issues might be because the script cannot access certain directories or files.

If you still face issues, consider reaching out to community forums or checking the official documentation of the libraries used in the script for more insights.


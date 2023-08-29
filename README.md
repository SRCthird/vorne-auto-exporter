# Vorne XL Data Collector (Executable)

This program is designed to fetch data from a Vorne XL database, process the information, and then store it in a MySQL database. It provides both automated and manual methods to retrieve and update the data.

## Prerequisites

* Node.js and NPM (optional)
* git (optional)
* [MySQL server v 8.0.28](https://downloads.mysql.com/archives/community/)
* A server/computer with sleep disabled

## Installation

1. Clone the repository to a local machine:
```bash
git clone -b executable https://github.com/SRCthird/vorne-database.git
```
2. Navigate to the project directory:
```bash
cd vorne-database
```

## Database Setup

1. Install the required version of [MySQL](https://downloads.mysql.com/archives/community/).

2. Extract the .zip file to the project directory, and rename the folder mysql.

3. Initialize the MySQL database:
```bash
vorne-query --init
```
4. You will be prompted to enter a password, this will be saved and used in all automation accessing the MySQL server. Make it easy to remember but hard to guess.

5. Create schema.yaml file:<br>
    The program will pull the data with a yaml architecture of the following format:
    ```yaml
    Database:
        <ipaddress>
            Name: <name of database> # Will be the name of the database in MySQL
            Tables: 
                Registers: # These tables are just for reference and wont be pulled
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

* **Automated Data Collection** 
    The program is set up to automatically fetch and process data from the Vorne XL database servers every 24 hours. To start this service, run:
```bash
vorne-query --start
```
* **Manual Data Refresh**
    If you need to manually update the data and don't want to restart the loop, use:
```bash
vorne-query --refresh
```

## Configuration

Before starting, ensure you update the [schema.yaml](/README.md#L37) and [initialize](/README.md#L29) the program.

**You will beed the following:**
* Vorne XL database credentials and endpoint
* A MySQL database credentials and settings

## License 

[ISC](/LICENSE)
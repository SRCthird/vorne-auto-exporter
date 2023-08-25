# Vorne XL Data Collector

This program is designed to fetch data from a Vorne XL database, process the information, and then store it in a MySQL database. It provides both automated and manual methods to retrieve and update the data.

## Prerequisites

* Node.js and NPM
* [MySQL server v 8.0.28](https://downloads.mysql.com/archives/community/)
* A server/computer with sleep disabled

## Installation

1. Clone the repository to a local machine:
```bash
git clone https://github.com/SRCthird/tvmc-database.git
```
2. Navigate to the project directory
```bash
cd tvmc-database
```
3. Install the required dependencies
```bash
npm install
```

## Database Setup

1. Install the required version of [MySQL](https://downloads.mysql.com/archives/community/).

2. Extract the .zip file to the project directory, and renaim the folder mysql.

3. Initialize the MySQL database:
```bash
npm run init
```
4. You will be prompted to enter a password, this will be saved and used in all automation accessing the MySQL server. Make it easy to remember but hard to guess.

5. Start the server:
```bash
npm run start-db
```

## Usage

* **Automated Data Collection** 
    The program is set up to automatically fetch and process data from the Vorne XL database servers every 24 hours. To start this service, run:
```bash
npm run query-loop
```
* **Manual Data Refresh**
    If you need to manually update the data and don't want to restart the loop, use:
```bash
npm run query-solo
```

## Configuration

Before starting, ensure you update the schema.yaml with:

* Vorne XL database credentials and endpoint
* MySQL database credentials and settings

## License 

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
import mysql from'mysql2/promise';
import readlineSync from 'readline-sync';
import fs from 'fs';

const passwordConfig = {
    host: 'localhost',
    user: 'root'
};

const passwordFile = 'password.json';

async function setPassword(password) {
    const connection = await mysql.createConnection(passwordConfig);
    try {
        await connection.query(`ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '${password}';`);
        console.log('Password set successfully.');
    } catch (err) {
        console.error('Error creating password:', err);
    } finally {
        await connection.end();
    }
}

async function main() {
    // Ask the user for a password.
    const password = readlineSync.question('Please enter a new password for the MySQL root user (input will be hidden): ', {
        hideEchoBack: true
    });

    // Save the password in a JSON file.
    fs.writeFileSync(passwordFile, JSON.stringify({password}));

    // Set the password in MySQL.
    await setPassword(password);
}

main();

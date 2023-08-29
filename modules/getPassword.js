const { readFileSync } = require('fs');

function getPassword() {
    const data = JSON.parse(readFileSync('password.json', 'utf8'));
    return data.password;
}

module.exports = { getPassword };
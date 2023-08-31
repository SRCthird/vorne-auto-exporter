const { query } = require('./query.js');

function runAndWait() {
    query();
    console.log('Hit ctl+c to end the loop.')

    let chars = ['|', '/', '-', '\\'];
    let currentChar = 0;
    let spinnerInterval = setInterval(() => {
        process.stdout.write(`\r${chars[currentChar]} Waiting for next execution...`);
        currentChar = (currentChar + 1) % chars.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(spinnerInterval);
        process.stdout.write('\rDone waiting!     \n');
        runAndWait();
    }, 24 * 60 * 60 * 1000);
}

module.exports = { runAndWait };

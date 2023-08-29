const query = require('./query.js');

// Loading spinner logic
let chars = ['|', '/', '-', '\\'];
let currentChar = 0;

function showSpinner() {
    process.stdout.write(`\r${chars[currentChar]} Waiting for next execution...`);
    currentChar = (currentChar + 1) % chars.length;
}

// Function to run the main program, wait 24 hours, and then run it again
function runAndWait() {
    query();

    // Start the spinner
    let spinnerInterval = setInterval(showSpinner, 200);

    // Stop the spinner after 24 hours and run the program again
    setTimeout(() => {
        clearInterval(spinnerInterval);
        process.stdout.write('\rDone waiting!     \n'); // Clear the spinner
        runAndWait(); // recursive call
    }, 24 * 60 * 60 * 1000);
}

module.exports = { runAndWait };

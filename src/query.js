import fs from 'fs';
import yaml from 'js-yaml';

// Define your main program logic in a function
async function mainProgram() {
    const { processQuery } = await import('../modules/processQuery.js');

    // Read the schema.yaml file
    const fileContent = fs.readFileSync('schema.yaml', 'utf8');

    // Parse the YAML content
    const config = yaml.load(fileContent);

    for (const [database, content] of Object.entries(config['Database'])) {
        console.log(`Processing on server ${database}`);

        const Database = config['Database'][database];
        // Process each table in the Stream section
        for (const Table of Object.keys(Database['Tables']['Streams'])) {
            processQuery(Database, database, Table);
        }
    }
}

// Loading spinner logic
let chars = ['|', '/', '-', '\\'];
let currentChar = 0;

function showSpinner() {
    process.stdout.write(`\r${chars[currentChar]} Waiting for next execution...`);
    currentChar = (currentChar + 1) % chars.length;
}

// Function to run the main program, wait 24 hours, and then run it again
function runAndWait() {
    mainProgram();

    // Start the spinner
    let spinnerInterval = setInterval(showSpinner, 200);

    // Stop the spinner after 24 hours and run the program again
    setTimeout(() => {
        clearInterval(spinnerInterval);
        process.stdout.write('\rDone waiting!     \n'); // Clear the spinner
        runAndWait(); // recursive call
    }, 24 * 60 * 60 * 1000);
}

// Initial call
runAndWait();

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'mostActive' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY customers as parameter.
 */

function mostActive(customers) {
    // Write your code here
    let thresholdInNumber = Math.ceil(customers.length / 20);
    let repeated = new Map();
    let result = new Set();
    for(let i = 0; i<customers.length; i++)
    {
        let customer = customers[i];
        if(!repeated.has(customer))
        {
            repeated.set(customer, 0);
        }
        let currentCount = repeated.get(customer);
        repeated.set(customer, ++currentCount);
        if(currentCount >= thresholdInNumber)
        {
            result.add(customer);
        }
    }
    
    return ([...result].sort((a,b) => a.localeCompare(b)))
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const customersCount = parseInt(readLine().trim(), 10);

    let customers = [];

    for (let i = 0; i < customersCount; i++) {
        const customersItem = readLine();
        customers.push(customersItem);
    }

    const result = mostActive(customers);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

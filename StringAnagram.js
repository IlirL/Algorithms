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
 * Complete the 'stringAnagram' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY dictionary
 *  2. STRING_ARRAY query
 */

function stringAnagram(dictionary, query) {
    // Write your code here
    const normalize = w => w.split('').sort().join('');
    
    const dictMap = new Map();
    for(let word of dictionary)
    {
        const key = normalize(word);
        dictMap.set(key, (dictMap.get(key) || 0) + 1);
    }
    
    return query.map(q => dictMap.get(normalize(q)) || 0);
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const dictionaryCount = parseInt(readLine().trim(), 10);

    let dictionary = [];

    for (let i = 0; i < dictionaryCount; i++) {
        const dictionaryItem = readLine();
        dictionary.push(dictionaryItem);
    }

    const queryCount = parseInt(readLine().trim(), 10);

    let query = [];

    for (let i = 0; i < queryCount; i++) {
        const queryItem = readLine();
        query.push(queryItem);
    }

    const result = stringAnagram(dictionary, query);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

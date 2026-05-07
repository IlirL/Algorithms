'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */

function repeatedString(s: string, n: number): number {
    // Write your code here
    let initialCount = 0;
    let substring = n%s.length == 0 ? '':s.substring(0, n%s.length);
    let initialCountInSubs = 0;
    for(let i = 0; i<s.length; i++)
    {
        if(s[i] == 'a') {initialCount++; if(i < substring.length){initialCountInSubs++}};
    }
    return (Math.floor(n/s.length))*initialCount + initialCountInSubs;
    
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const n: number = parseInt(readLine().trim(), 10);

    const result: number = repeatedString(s, n);

    ws.write(result + '\n');

    ws.end();
}

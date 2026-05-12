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
 * Complete the 'breakingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */

function breakingRecords(scores: number[]): number[] {
    // Write your code here
    let highestScore: number = 0;
    let lowestScore: number = 0;
    
    let resultHighest = 0;
    let resultLowest = 0;
    
    if(scores.length == 0)
    {
        return [resultHighest, resultLowest];
    }
    
    highestScore = scores[0];
    lowestScore = highestScore;
    
    for(let i = 1; i<scores.length; i++)
    {
        if(scores[i] > highestScore)
        {
            resultHighest++;
            highestScore = scores[i];
        } 
        if(scores[i] < lowestScore)
        {
            resultLowest++;
            lowestScore= scores[i];
        }
    }
    
    return [resultHighest, resultLowest];
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const scores: number[] = readLine().replace(/\s+$/g, '').split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result: number[] = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}

'use strict';

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
 * Complete the 'countResponseTimeRegressions' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY responseTimes as parameter.
 */

function countResponseTimeRegressions(responseTimes: number[]): number {
    // Write your code here
    let currentSum = responseTimes[0];
    let result = 0;
    for(let i = 1; i<responseTimes.length; i++)
    {
        if(currentSum/i < responseTimes[i]) result++;
        currentSum += responseTimes[i];
    }
    return result;
}

function main() {
    const responseTimesCount: number = parseInt(readLine().trim(), 10);

    let responseTimes: number[] = [];

    for (let i: number = 0; i < responseTimesCount; i++) {
        const responseTimesItem: number = parseInt(readLine().trim(), 10);

        responseTimes.push(responseTimesItem);
    }

    const result: number = countResponseTimeRegressions(responseTimes);

    process.stdout.write(result + '\n');
}

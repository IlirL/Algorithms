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
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k: number, s: number[]): number {
    // Write your code here
    let moduleMap: Map<number, number> = new Map();
    for(let i = 0; i<s.length; i++)
    {
        let remainder = s[i]%k;
        let currentCount = moduleMap.get(remainder) ?? 0;
        moduleMap.set(remainder, currentCount + 1);
    }
    //We can mostly have 1 with module 0
    let modulesSelected: Map<number, number> = new Map();
    let result = 0;
    if(moduleMap.has(0))
    {
        modulesSelected.set(0, 1);
        result += 1;
    }
    if(k%2 == 0 && moduleMap.has(k/2))
    {
        modulesSelected.set(k/2, 1);
        result += 1;
    }
    for(let i = 1; i<Math.ceil(k/2); i++)
    {

        result += Math.max(moduleMap.get(i) ?? 0, moduleMap.get(k-i) ?? 0);
    }
    
    return result;
    
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const s: number[] = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result: number = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}

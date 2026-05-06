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
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a: number[], b: number[]): number {
    // Write your code here
    let result = 0;
    for(let i = 1; i<=100; i++)
    {
        let eligible = true;
        for(let j = 0; j<a.length; j++)
        {
            if(i%a[j] !== 0)
            {
                eligible = false;
                break;
            }
        }
        if(eligible)
        {
            for(let j = 0; j<b.length; j++)
            {
                if(b[j] % i !== 0)
                {
                    eligible = false;
                    break;
                }
            }
        }
        
        if(eligible)
        {
            result++;
        }
        
    }
    
    return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const m: number = parseInt(firstMultipleInput[1], 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total: number = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}

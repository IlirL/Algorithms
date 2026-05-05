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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades: number[]): number[] {
    // Write your code here
    const result: number[] = [];
    
    for(let i = 0; i<grades.length; i++)
    {
        const currentGrade = grades[i];
        const nextMultipleOf5 = currentGrade + (5-currentGrade%5);
        if(currentGrade < 38)
        {
            result.push(currentGrade);
        } else if(nextMultipleOf5 - currentGrade < 3)
        {
            result.push(nextMultipleOf5);
        } else
        {
            result.push(currentGrade)
        }
        
    }
    
    return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const gradesCount: number = parseInt(readLine().trim(), 10);

    let grades: number[] = [];

    for (let i: number = 0; i < gradesCount; i++) {
        const gradesItem: number = parseInt(readLine().trim(), 10);

        grades.push(gradesItem);
    }

    const result: number[] = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

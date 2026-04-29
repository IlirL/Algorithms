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
 * Complete the 'mergeHighDefinitionIntervals' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY intervals as parameter.
 */

function mergeHighDefinitionIntervals(intervals: number[][]): number[][] {
    // Write your code here
    if(intervals.length == 0 || intervals.length == 1) return intervals;

    const sortedIntervals:number[][] = intervals.sort((a: number[], b:number[]) => a[0] - b[0]);
    let result: number[][] = [];
    result.push(sortedIntervals[0]);
    for(let i = 1; i < sortedIntervals.length; i++)
    {
        let lastAddedInterval = result.pop();
        if(lastAddedInterval![1] >= sortedIntervals[i][0])
        {
            result.push([lastAddedInterval![0], Math.max(lastAddedInterval![1], sortedIntervals[i][1])]);
        } else{
            result.push(lastAddedInterval!);
            result.push(sortedIntervals[i]);
    }
    }
    return result;
}

function main() {
    const intervalsRows: number = parseInt(readLine().trim(), 10);

    const intervalsColumns: number = parseInt(readLine().trim(), 10);

    let intervals: number[][] = Array(intervalsRows);

    for (let i: number = 0; i < intervalsRows; i++) {
        intervals[i] = readLine().replace(/\s+$/g, '').split(' ').map(intervalsTemp => parseInt(intervalsTemp, 10));
    }

    const result: number[][] = mergeHighDefinitionIntervals(intervals);

    process.stdout.write(result.map(x => x.join(' ')).join('\n') + '\n');
}

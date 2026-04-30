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
 * Complete the 'countSubarraysWithSumAndMaxAtMost' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY nums
 *  2. LONG_INTEGER k
 *  3. LONG_INTEGER M
 */

function countSubarraysWithSumAndMaxAtMost(nums: number[], k: number, M: number): number {
    // Write your code here
    let totalCount = 0;
    let segmentStart = 0;
    
    for(let i = 0; i<=nums.length; i++)
    {
        if(i == nums.length || nums[i] > M)
        {
            const prefixCount = new Map<number, number>();
            prefixCount.set(0,1);
            let prefixSum = 0;
            
            for(let j = segmentStart; j<i; j++)
            {
                prefixSum += nums[j];
                const needed = prefixSum - k;
                totalCount += prefixCount.get(needed) ?? 0;
                prefixCount.set(prefixSum, (prefixCount.get(prefixSum) ?? 0) + 1);
            }
            
            segmentStart = i+1;
        }
    }
    
    return totalCount;
}

function main() {
    const numsCount: number = parseInt(readLine().trim(), 10);

    let nums: number[] = [];

    for (let i: number = 0; i < numsCount; i++) {
        const numsItem: number = parseInt(readLine().trim(), 10);

        nums.push(numsItem);
    }

    const k: number = parseInt(readLine().trim(), 10);

    const M: number = parseInt(readLine().trim(), 10);

    const result: number = countSubarraysWithSumAndMaxAtMost(nums, k, M);

    process.stdout.write(result + '\n');
}

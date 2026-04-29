/*Consider a connected graph consisting of nodes bidirectional edges. Each edge is 1 unit of distance long, and only one edge connects any two nodes. There is one cycle in the graph. For each node, determine its shortest distance from the cycle and return the distances in an integer array. If a node is in the cycle its distance is 0. */
function distancesFromCycle(n: number, edges: [number, number][]):number[] {
    const adj: number[][] = Array.from({length: n}, () => {});
    for(const [u,v] of edges){
        adj[u].push(v);
        adj[v].push(u);
    }

    //Phase 1: Find cycle nodes via DFS
    const inCycle = new Array(n).fill(false);
    const visited = new Array(n).fill(false);
    const parent = new Array(n).fill(-1);

    function markCycle(start: number, end: number) {
        let cur = end;
        while(cur != start)
        {
            inCycle[cur] = true;
            cur = parent[cur];
        }
        inCycle[start] = true;
    }

    function dfs(node: number, par: number): boolean {
        visited[node] = true;
        for(const neighbour of adj[node]){
            if(neighbour === par) continue; //skip the edge we came from
            if(visited[neighbour]){
                markCycle(neighbour, node);
                return true;
            }
            parent[neighbour] = node;
            if(dfs(neighbour, node)) return true;
        }
        return false;
    }

    dfs(0, -1);

    //Phase 2: Multi source BFS from all cycle nodes
    const dist = new Array(n).fill(-1);
    const queue: number[] = [];
    for(let i = 0; i<n; i++)
    {
        if(inCycle[i])
        {
            dist[i] = 0;
            queue.push(i);
        }
    }

    let head = 0;
    while(head < queue.length){
        const node = queue[head++];
        for(const neighbour of adj[node])
        {
            if(dist[neighbour] === -1)
            {
                dist[neighbour] = dist[node] + 1;
                queue.push(neighbour);
            }
        }
    }

    return dist;
}
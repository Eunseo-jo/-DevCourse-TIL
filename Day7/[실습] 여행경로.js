/*
let answer = [];
let visited = Array(10000).fill(false);
const dfs = (start, ticket, level) => {
    if(level === ticket.length) return true;
    for(let i =0; i < ticket.length; i++){
        const [st, dest] = ticket[i];
        if(!visited[i] && st===start){
            visited[i] = true;
            answer.push(dest);
            if(dfs(dest, ticket, level+1)) return true;
            visited[i] = false;
        }
    }
    answer.pop();
    return false;
}

function solution(tickets) {
    let sortedTicket = tickets.sort((a,b)=>{
        if(a[0] === b[0]) return a[1].localeCompare(b[1]);
        else return a[0].localeCompare(b[0]);
    });
    answer.push("ICN");
    dfs("ICN", sortedTicket, 0);
    return answer;
}
*/

function solution(tickets) {
    // 인접 리스트로 그래프를 구성합니다.
    const graph = {};
    for (const [src, dest] of tickets) {
        if (graph[src] === undefined) {
            graph[src] = [];
        }
        graph[src].push(dest);
    }
    for (const key in graph) {
        // 역순으로 문자열들을 정렬합니다.
        console.log(key);
        graph[key].sort((a, b) => (a > b ? -1 : 1));
    }

    const stack = ['ICN']; // DFS를 위한 스택
    const answer = []; // 경로를 저장하기 위한 리스트
    while (stack.length > 0) {
        // DFS 시작
        const src = stack[stack.length - 1]; // Top 요소를 확인합니다.

        // 갈 수 있는 경로가 있다면
        if (graph[src] && graph[src].length > 0) {
            // 갈 수 있는 경로 중 알파벳 순으로 앞선 것을 먼저 방문합니다.
            // 역순으로 정렬했기에 pop을 하면 알파벳 순입니다.
            stack.push(graph[src].pop());
        } else {
            // 더 이상 갈 수 있는 경로가 없다면
            // 경로를 추가합니다.
            answer.push(stack.pop());
        }
    }
    console.log(answer);
    // 스택 결과를 넣은 것이기 때문에 역순으로 결과를 반환합니다.
    return answer.reverse();
}
console.log(
    solution([
        ['ICN', 'SFO'],
        ['ICN', 'ATL'],
        ['SFO', 'ATL'],
        ['ATL', 'ICN'],
        ['ATL', 'SFO'],
    ])
); //["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

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

console.log(solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]])); //["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]
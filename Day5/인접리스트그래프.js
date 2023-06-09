//배열 초기화
const graph = Array.from(Array(5), () => []);
//연결할 정점 추가
graph[0].push(1);
graph[0].push(2);
graph[1].push(2);
graph[2].push(3);

/*
0: 1 2
1: 2
2: 3
3:
4:
*/
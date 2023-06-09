//2차원 배열 초기화
const graph = Array.from(Array(5), () => Array(5).fill(false));

// 간선 추가
graph[0][1] = true; //null과 값으로 가중치 넣어주기
graph[0][3] = true;
graph[1][2] = true;
graph[2][0] = true;
graph[2][4] = true;
graph[3][2] = true;
graph[4][0] = true;

/*
0 1 0 1 0
0 0 1 0 0
1 0 0 0 1
0 0 1 0 0
1 0 0 0 0

*/
//인접 리스트 그래프

class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        this.queue[this.rear++] = value;
    }

    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front += 1;
        return value;
    }

    isEmpty() {
        return this.rear === this.front;
    }
}

function solution(n, edge) {
    const graph = Array.from(Array(n + 1), () => []); //초기값 빈 배열

    for (const [src, dest] of edge) {
        //그래프 생성
        graph[src].push(dest);
        graph[dest].push(src);
    }

    const distsance = Array(n + 1).fill(0); //각 정점의 거리 기록
    distsance[1] = 1; //첫 정점, 1번의 길이
    //bfs: 가까이 있는 것부터 하나씩
    //1번에서부터 2번 3번
    //2번에서 5,4, 3(이미감)
    //3에서 6

    //배열 이용
    const queue = [1];
    while (queue.length > 0) {
        const src = queue.shift(); //너무 커지면 사용하지 말기
        for (const dest of graph[src]) {
            if (distsance[dest] === 0) {
                //가지 않는 경로는 0으로 초기화
                queue.push(dest);
                distsance[dest] = distsance[src] + 1;
            }
        }
    }
    /*
        const queue = new Queue();
        queue.enqueue(1);
        while(!queue.isEmpty()){
            const src = queue.dequeue();
            for(consts dest of graph[src]){
                if(distsance[dest] === 0){
                    queue.enqueue(dest);
                    distsance[dest] = distsance[src] + 1;
                }
            }
        }
    */
    //최대값 구하기
    console.log(graph);
    const max = Math.max(...distsance);
    return distsance.filter((item) => item === max).length;
}

console.log(
    solution(6, [
        [3, 6],
        [4, 3],
        [3, 2],
        [1, 3],
        [1, 2],
        [2, 4],
        [5, 2],
    ])
); //3

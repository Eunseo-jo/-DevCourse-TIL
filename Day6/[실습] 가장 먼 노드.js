//인접 리스트 그래프
function solution(n, edge) {
    const graph = Array.from(Array(n+1), () => []); //초기값 빈 배열

    for(const [src, dest] of edge){
        graph[src].push(dest);
        graph[dest].push(src);
    }

    const distsance = Array(n+1).fill(0);
    distsance[1] = 1;
    //bfs
    const queue = [1];
    while(queue.length > 0){
        const src = queue.shift(); //너무 커지면 사용하지 말기
        for(const dest of graph[src]){
            if(distsance[dest] === 0) { //가지 않는 경로는 0으로 초기화
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
    const max = Math.max(...distsance);
    return distsance.filter(item => item === max).length;
}

class Queue { //코테 추천
    constructor(){
        this.queue = []; //요소 담기
        this.front = 0; //첫 요소 index
        this.rear = 0; //마지막 요소 index
    }
    
    enqueue(value){
        this.queue[this.rear++] = value;
    }

    dequeue(){
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front += 1;
        return value;
    }

    isEmpty(){
        return this.rear === this.front;
    }

}



console.log(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))//3
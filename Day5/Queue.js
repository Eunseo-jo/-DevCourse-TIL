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
        //front index에 해당하는 값을 반환하고 증가
        //바로 반환하면 함수가 종료 -> 임시로 값을 넣어주고 삭제
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front += 1;
        return value;
    }

    peek(){
        return this.queue[this.front];  
    }

    size(){
        return this.rear - this.front;
    }
}
module.exports = Queue;
const queue = new Queue;
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.dequeue());
queue.enqueue(8);
console.log(queue.size());
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.dequeue());

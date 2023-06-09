class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //포인터
    }
}

class Queue { //노드끼리 엮어주는 역할
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    enqueue(newValue){
        const newNode = new Node(newValue);
        if(this.head === null){ //아무 값이 없을 때
            this.head = this.tail = newNode;
        }
        else{ //값 존재
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
    }

    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        this.length -= 1;
        return value;
    }

    peek() {
        return this.head.value;
    }
    size() {
        return this.length;
    }
}

function solution(priorities, location) {
    let queue = new Queue;
    for(let i = 0; i < priorities.length; i++){
        queue.enqueue([priorities[i], i]);
    }
    priorities.sort((a,b) => b-a);

    let cnt = 0;
    while(queue.size() > 0){
        const currValue = queue.peek();
        if(currValue[0] < priorities[cnt]){
            queue.enqueue(queue.dequeue())
        }
        else{
            const value = queue.dequeue();    
            cnt += 1;
            if(value[1] === location) return cnt;
        }
    }
    
}


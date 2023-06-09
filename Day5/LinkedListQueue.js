
//LinkedList Queue
class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //포인터
    }
}

class QueueLinkedList { //노드끼리 엮어주는 역할
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
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
        this.size += 1;
    }

    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        this.size -= 1;
        return value;
    }

    peek() {
        return this.head.value;
    }
}


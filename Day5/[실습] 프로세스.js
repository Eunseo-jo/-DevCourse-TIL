class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = this.tail = newNode;
        } else {
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
    let queue = new Queue();
    for (let i = 0; i < priorities.length; i++) {
        queue.enqueue([priorities[i], i]);
    }
    priorities.sort((a, b) => b - a);

    let cnt = 0;
    while (queue.size() > 0) {
        const currValue = queue.peek();
        if (currValue[0] < priorities[cnt]) {
            queue.enqueue(queue.dequeue());
        } else {
            const value = queue.dequeue();
            cnt += 1;
            if (value[1] === location) return cnt;
        }
    }
    /*
    while (queue.size()) {
        const currValue = queue.dequeue();
        if (currValue[0] < priorities[cnt]) {
            queue.enqueue(currValue);
        } else {
            cnt++;
            if (currValue[1] === location) return cnt;
        }
    }
*/
}

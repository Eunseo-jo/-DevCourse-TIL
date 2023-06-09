class MaxHeap{
    constructor(){
        this.heap = [null];
    }

    push(value){
        this.heap.push(value);
        let currentIndex = this.heap.length;
        let parentIndex = Math.floor(currentIndex / 2);

        while(parentIndex !== 0 && this.heap[parentIndex] < value){
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = value;
            this.heap[currentIndex] = temp;

            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    pop(){
        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();

        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        while(
            this.heap[currentIndex] < this.heap[leftIndex] ||
            this.heap[currentIndex] < this.heap[rightIndex]
        ){
            if(this.heap[leftIndex] < this.heap[rightIndex]){
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[rightIndex];
                this.heap[rightIndex] = temp;
                currentIndex = rightIndex;
            }
            else{
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[leftIndex];
                this.heap[leftIndex] = temp;
                currentIndex = leftIndex;
            }
            leftIndex = currentIndex * 2;
            rightIndex = currentIndex * 2 + 1;
        }
        return returnValue;
    }
}

const heap = new MaxHeap;
heap.push(45);
heap.push(36);
heap.push(54);
heap.push(27);
heap.push(63);
console.log(heap.heap);
/*
const array = [];
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
console.log(array);
*/
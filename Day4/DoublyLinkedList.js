class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //다음 노드
        this.prev = null; //이전 노드
    }
}

class DoublyLinkedList { 
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    find(value){
        let currNode = this.head;
        while(currNode){
            if(currNode.value === value) {
                return currNode;
            }
            currNode = currNode.next;
        }
        return null; 
    }

    append(newValue){ 
        const newNode = new Node(newValue);
        if(this.head === null){ //빈 리스트
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
        }
        else{ //값 존재
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            this.length += 1;
        }
    }

    insert(node, newValue){ //노드 중간에 넣기 O(1)
        if(node === null) return;
        const newNode = new Node(newValue); //입력 받은 값으로 노드 생성
        newNode.next = node.next; //생성된 노드의 다음을 입력받은 노드의 다음으로
        node.next = newNode; //입력받은 노드의 다음을 새로 생성된 노드를 가리킴

        newNode.prev = node;
        node.next.prev = newNode;

        this.length += 1;
    }

    remove(value){ //값을 찾은 후 삭제 O(n)
        if(this.head === null ) return; //빈 리스트일 때
        
        if(this.head.value === value){
            this.head = this.head.next;
            if(this.head === null){ //리스트에 하나의 노드만 있을 때
                this.tail = null;
            }
            else{
                this.head.prev = null;
            }
            this.length -= 1;
            return;
        }
        //노드 탐색 & 지우기
        let prevNode = this.head;
        while(prevNode.next){
            if(prevNode.value === value){
                prevNode.next = prevNode.next.next;
                if(prevNode.next === null){ // 끝 노드 일때
                    this.tail = prevNode;
                }
                else{
                    prevNode.next.prev = prevNode;
                }
                this.length -= 1;
                return;
            }
            prevNode = prevNode.next;
        }
        return; //리스트 안에 값이 존재하지 않을 때
    }

    size(){
        return this.length;
    }

    display(){
        let currNode = this.head;
        let displayString = "[";
        while(currNode !== null){
            displayString += `${currNode.value}, `;
            currNode = currNode.next;
        }
        displayString = displayString.substr(0, displayString.length -2);
        displayString += "]";
        console.log(displayString);
    }
}

const linkedList = new DoublyLinkedList;
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
console.log(linkedList.find(2));
linkedList.append(5);
console.log(linkedList.size());
linkedList.display();
console.log(linkedList.find(3));
linkedList.remove(3);
linkedList.display();
linkedList.insert(linkedList.find(2), 10);
linkedList.display();
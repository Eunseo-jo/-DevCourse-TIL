class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //포인터
    }
}

class StackLinkedList { //노드끼리 엮어주는 역할
    constructor(){
        this.top = null;
        this.length = 0;
    }

    push(newValue){ //끝 부분에 추가
        const newNode = new Node(newValue);
        newNode.next = this.top;
        this.top = newNode;
        this.length += 1;
    }

    pop(){ //맨 뒤 값 삭제
        if(this.top === null ) return; //빈 리스트일 때
        const last = this.top;
        this.top = this.top.next;
        last.next = null;
        this.length--;        
        return last.value; //리스트 안에 값이 존재하지 않을 때
    }

    size(){
        return this.length;
    }

}

const linkedList = new StackLinkedList();
linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(5);
console.log(linkedList.size()); // 4
console.log(linkedList.pop()); // 5
console.log(linkedList.pop()); 
console.log(linkedList.pop()); 
console.log(linkedList.pop()); 
console.log(linkedList.size()); // 3
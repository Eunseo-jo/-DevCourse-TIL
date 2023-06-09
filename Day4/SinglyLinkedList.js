class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //포인터
    }
}

class SinglyLinkedList { //노드끼리 엮어주는 역할
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
        return null; //값을 찾지 못한 경우
        /*
        while(currNode.value !== value){ //값을 찾을 때까지 루프 돌리기
            currNode = currNode.next;
        }
        return currNode;
        */
    }

    append(newValue){ //끝 부분에 추가
        const newNode = new Node(newValue);
        if(this.head === null){ //아무 값이 없을 때
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
        }
        else{ //값 존재
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
        this.length += 1;
    }

    remove(value){ //값을 찾은 후 삭제 O(n)
        if(this.head === null ) return; //빈 리스트일 때
        
        if(this.head.value === value){
            this.head = this.head.next;
            if(this.head === null){ //리스트에 하나의 노드만 있을 때
                this.tail = null;
            }
            this.length -= 1;
            return;
        }
        //노드 탐색 & 지우기
        let prevNode = this.head;
        while(prevNode.next){
            if(prevNode.value === value){
                prevNode.next = prevNode.next.next;
                if(prevNode.next === null){
                    this.tail = prevNode;
                }
                this.length -= 1;
                return;
            }
            prevNode = prevNode.next;
        }
        return; //리스트 안에 값이 존재하지 않을 때
        /*
        while(prevNode.next.value !== value ){ //값 찾기
            prevNode = prevNode.next;
        }
        if(prevNode.next !== null){
            prevNode.next = prevNode.next.next; //이전 노드의 다음을 다음의 다음을 가리키도록 수정
            //중간 노드가 연결되지 않아 삭제됨 -- 가비지 컬렉션으로 메모리에서 제거됨
        }
        this.length -= 1;
        */
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

const linkedList = new SinglyLinkedList;
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
console.log(linkedList.size());
linkedList.display();
console.log(linkedList.find(3));
linkedList.remove(3);
linkedList.display();
linkedList.insert(linkedList.find(2), 10);
linkedList.display();
class Node {
    constructor(value){
        this.value = value; //값
        this.next = null; //포인터
    }
}

class CircularLinkedList { //노드끼리 엮어주는 역할
    constructor(){
        this.head = null;
        this.length = 0;
    }

    find(value){
        let currNode = this.head;
        let cnt = 0;
        while(currNode){
            if(cnt === this.length) return null;
            if(currNode.value === value) {
                return currNode;
            }
            currNode = currNode.next;
            cnt++;
        }
        return null; //값을 찾지 못한 경우
    }

    append(newValue){ //끝 부분에 추가
        const newNode = new Node(newValue);
        if(this.head === null){ //아무 값이 없을 때
            this.head = newNode;
            newNode.next = newNode;
        }
        else{ //값 존재
            let tail = this.head;
            while(tail.next !== this.head){ //마지막 노드 찾기
                tail = tail.next;
            }
            tail.next = newNode;
            newNode.next = this.head;
            
        }
        this.length += 1;
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
        
        if(this.head.value === value){ //헤드를 지울 때
            this.head = this.head.next;
            if(this.head === null){ //리스트에 하나의 노드만 있을 때
                this.head = null;
            }
            else{
                this.head = this.head.next;                
            }
            this.length -= 1;
            return;
        }
        //노드 탐색 & 지우기
        let currNode = this.head;
        
        while(currNode.next !== this.head){
            if(currNode.next.value === value){
                currNode.next = currNode.next.next;
                currNode.next.next.prev = currNode.prev;
                this.length -= 1;
                return;
            }
            currNode = currNode.next;
        }
        return; //리스트 안에 값이 존재하지 않을 때
    }

    size(){
        return this.length;
    }

    display(){
        let currNode = this.head;
        let displayString = "[";
        while(1){
            displayString += `${currNode.value}, `;
            currNode = currNode.next;
            if(currNode === this.head) break;
        }
        displayString = displayString.substr(0, displayString.length -2);
        displayString += "]";
        console.log(displayString);
    }
}

const linkedList = new CircularLinkedList;
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
linkedList.display();
console.log(linkedList.find(3));
//linkedList.remove(3);
//linkedList.display();
//linkedList.insert(linkedList.find(2), 10);
//linkedList.display();
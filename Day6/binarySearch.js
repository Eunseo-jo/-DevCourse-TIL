const Queue = require('../Day5/Queue');

const array = [1,1,5,124,400, 599, 1004, 2876, 8712]
function binarySearch(array, findValue){
    let left = 0;
    let right = array.length -1;
    let mid = Math.floor((left + right) / 2);
    while(left < right){
        if(array[mid] === findValue){
            return mid;
        } 
        if(array[mid] < findValue){
            left = mid + 1;
        }
        else{
            right = mid - 1;
        }

        mid = Math.floor((left + right) / 2);
    }
    return -1;
}

class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }

    insert(value){
        const newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while( currentNode !== null){
            if(currentNode.value < value){
                if(currentNode.right === null){
                    currentNode.right = newNode;
                    break;
                }
                currentNode = currentNode.left;
            }
        }
    }

    delete(value){
        if(this.root === null) return;
        let queue = new Queue(); //노드 순회를 위한 큐
        queue.enqueue(this.root);
        let targetNode = null;
        let parentNode = null;

        while(queue.length){ //탐색하기
            let currentNode = queue.dequeue();
            if(currentNode.value === value){
                targetNode = currentNode;
                break;
            }
            parentNode = currentNode;

            if(currentNode.left){
                queue.enqueue(currentNode.left);
            }
            if(currentNode.right){
                queue.enqueue(currentNode.right);
            }
        }

        if(!targetNode) return;

        if(!targetNode.left && !targetNode.right){ //leaf Node의 경우
            if(parentNode){
                if(parentNode.left === targetNode){
                    parentNode.left = null;
                }
                else{
                    parentNode.right = null;
                }
            }
            else{
                this.root = null;
            }
        }
        
        else{ //왼쪽,오른쪽 모두 노드가 있을 때
            let minNode = targetNode.right; //삭제할 노드에 가장 작은 값을 가지는 노드
            let minNodeParent = targetNode; 

            while(minNode.left){ //가장 작은 값 찾기
                minNodeParent = minNode;
                minNode = minNode.left;
            }
            targetNode.value = minNode.value;
            //minNode삭제
            if(minNodeParent.left === minNode) minNodeParent.left = null;
            else minNodeParent.right = null;
        }                
        
    }

    has(value){
        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.value === value){
                return true;
            }

            if(currentNode.value < value){
                currentNode = currentNode.right;
            }
            else{
                currentNode = currentNode.left;
            }
        }
        return false;
    }
    
}
const Queue = require('../Day5/Queue');
//0번 인덱스는 편의를 위해 비워두기
//Left = Index * 2
//Right = Index * 2 + 1
//Parent = floor(Index/2)
/*
const tree = [
    undefined,
    9,
    3,8,
    2,5, undefined, 7,
    undefined, undefined, undefined, 4
];
*/

class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(node){
        this.root = node;
    }

    display(){
        //Level Order
        const queue = new Queue();
        queue.enqueue(this.root);
        while(queue.size()){
            const currentNode = queue.dequeue();
            console.log(currentNode.value);
            if(currentNode.left) queue.enqueue(currentNode.left);
            if(currentNode.right) queue.enqueue(currentNode.right);
        }
    }
    //전위 순회(pre-order)
    /* 루트-왼쪽-오른쪽 순으로 노드 방문 */
    PreOrderRecursion(){
        function preOrderHelper(node){
            if(!node) return;
            console.log(node.value);
            preOrderHelper(node.left);
            preOrderHelper(node.right);
        }
        preOrderHelper(this.root);
    }

    PreOrderStack(){
        let nodeStack = [];
        nodeStack.push(this.root);
        while(nodeStack.length){
            let node = nodeStack.pop();
            console.log(node.value);
            if(node.right) nodeStack.push(node.right);
            if(node.left) nodeStack.push(node.left);
        }
    }
    //중위 순회(in-order)
    //왼쪽-현재노드-오른쪽 순으로 방문
    InOrderRecursion(){
        function inOrderHelper(node){
            if(!node) return;
            inOrderHelper(node.left);
            console.log(node.value);
            inOrderHelper(node.right);
        }
        inOrderHelper(this.root);
    }
    InOrderStack(){
        let current = this.root;
        let stack = [];
        let done = false;
        while(!done){
            if(current !== null){
                stack.push(current);
                current = current.left;
            }
            else{
                if(stack.length){
                    current = stack.pop();
                    console.log(current.value);
                    current = current.right;
                }
                else done = true;
            }
        }

    }
    //후위 순회(post-order)
    //왼쪽-오른쪽-현재 순으로 방문
    PostOrderRecursion(){
        function postOrderHelper(node){
            if(!node) return;
            postOrderHelper(node.left);
            postOrderHelper(node.right);
            console.log(node.value);
        }
        postOrderHelper(this.root);
    }

    PostOrderStack(){
        let stack1 = [];
        let stack2 = [];
        stack1.push(this.root);
        while(stack1.length){
            let node = stack1.pop();
            stack2.push(node);

            if(node.left) stack1.push(node.left);
            if(node.right) stack1.push(node.right);
        }
        while(stack2.length){
            let node = stack2.pop();
            console.log(node.value);
        }
    }
}

const tree = new Tree(new Node(9));
tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root.right.left = new Node(7);
tree.root.left.right.right = new Node(4);
tree.display();
tree.PostOrderRecursion();
tree.PostOrderStack();
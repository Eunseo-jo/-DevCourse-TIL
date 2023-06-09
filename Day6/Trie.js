const Queue = require('../Day5/Queue');
class Node{
    constructor(value = ""){
        this.value = value;
        this.children = new Map();
        this.EndOfWord = false;
    }
}

class Trie {
    constructor(){
        this.root = new Node();
    }

    has(string){
        let currentNode = this.root;

        for(const char of string){
            if(!currentNode.children.has(char)){
                return false;
            }
            currentNode = currentNode.children.get(char);
        }
        return true;
    }

    insert(string){
        let currentNode = this.root;

        for(const char of string){
            if((!currentNode.children.has(char))){
                currentNode.children.set(
                    char,
                    new Node(currentNode.value + char)
                );
            }
            currentNode = currentNode.children.get(char);
        }
        currentNode.EndOfWord = true;
    }
    //자동완성 코드 구현해보기 - 트리 파트에서 사용된 레벨 순회 응용
    autoComplete(prefix){
        let currentNode = this.root;
        for(const char of prefix){
            if((!currentNode.children.has(char))){
                return null;
            }
            currentNode = currentNode.children.get(char);
        }
        const queue = new Queue();
        queue.enqueue({node: currentNode, word: prefix});
        const suggest = [];
        while(queue.size()){
            const {node, word} = queue.dequeue();
            if(node.EndOfWord) suggest.push(word);
            for(const [char, childNode] of node.children){
                queue.enqueue({ node: childNode, word: word + char });
            }
        }

        return suggest;

    }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
console.log(trie.has("cat")); //true
console.log(trie.has("can")); //true
console.log(trie.has("cap")); //false

console.log(trie.autoComplete("ca"));



import Node from "./Node";

class UnsortedPriorityQueue{
    constructor(){
        this.dataArray = new Array();
        this.head = null;
        this.tail = null;
    }

    isEmpty = () => {
        if(this.head == this.tail && this.head == null){
            return true;
        }
        return false;
    }

    insert = (key, value) => {
        let node = new Node(key, value);
        if(this.isEmpty()){
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
    }

    delete = () => {
        if(this.isEmpty){
            return console.log("Queue is Empty");
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(min, null);
        let node = this.head;
        while(node !== null){
            if(node.key < min){
                min = node.key;
                minNode = node;
            }
            node = node.next;
        }
        node = minNode;
        if(this.head==minNode){
            if(minNode.next != null){
                this.head = minNode.next;
            } else {
                this.head = null;``
            }
        }
        if(this.tail==minNode){
            if(minNode.previous != null){
                this.tail = minNode.previous;
            } else {
                this.tail = null;
            }
        }
        if(minNode.previous != null){
            minNode.previous.next = minNode.next;
        }
        if(minNode.next != null){
            minNode.next.previous = minNode.previous;
        }
        return node;
    }

    min = () => {
        if(this.isEmpty){
            return console.log("Queue is Empty");
            return null;
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(min, null);
        let node = this.head;
        while(node !== null){
            if(node.key < min){
                min = node.key;
                minNode = node;
            }
            node = node.next;
        }
        return minNode;
    }

    size = () => {
        let count = 0;
        let node = this.head;
        while(node !== null){
            count+=1;
            node = node.next;
        }
        return count;
    }
}

export default UnsortedPriorityQueue;
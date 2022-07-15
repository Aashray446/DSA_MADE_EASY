import Node from "./Node";

class SortedPriorityQueue {
    constructor() {
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
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            let current = this.head;
            while (current.next !== null && current.next.key < key) {
                current = current.next;
            }
            if (current.next === null) {
                current.next = node;
                node.previous = current;
                this.tail = node;
            } else {
                node.next = current.next;
                current.next.previous = node;
                current.next = node;
                node.previous = current;
            }
        }
        this.size++;
    }

    delete = () => {
        if(this.isEmpty){
            return console.log("Queue is Empty");
        }
        let temp = this.head
        if(temp.next !== null){
            (temp) = (temp).next;
        }
        return temp;
    }

    min = () => {
        if(this.isEmpty){
            return console.log("Queue is Empty");
            return null;
        }
        return this.head;
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

export default SortedPriorityQueue;
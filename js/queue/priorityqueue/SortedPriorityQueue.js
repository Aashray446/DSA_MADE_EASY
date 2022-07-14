class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class SortedPriorityQueue {
    constructor() {
        this.dataArray = new Array();
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty = () => {
        return this.size === 0;
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
        let node = this.head;
        if(this.head.next != null){
            (this.head) = (this.head).next;
        }
        return
    }

}
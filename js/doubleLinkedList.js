// Please Make DoublyLinkList Implementation 
// All possible Functions 
class node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insert = function(value) {
        let node = new node(value);
        let pointer;
        if(this.head = null){
            this.head = node;
            this.tail = node;
        }
        else{
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        }
        this.size++;
    }

    insertAtIndex = function(value, index){
        if(index < 0 || index > this.size){
            return console.log("Invalid Index");
        }
        let node = new node(value);
        let current, previous;
        current = this.head;
        let position = 0;
        while(position<index){
            position++;
            current = current.next;
        }
        previous = current.prev;
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
        this.size++;
    }
   

}
// Please Make LinkList Implementation 
// All possible Functions 
class node {
    // constructor
    constructor(value) {
        this.value = value;
        this.next = null
    }
}

class SinglyLinkList {
 
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insert = function(value){
        let node = new node(value);
        let pointer;

        if(this.head === null) this.head = node;
        else{
            pointer = this.head;
            while(pointer.next){
                pointer = pointer.next;
            }
            pointer.next = node;
        }
        this.size++;
    }

    insertAtIndex = function(value,index) {
        if(index<0 || index>this.size) return alert("Enter Valid Index");
        let node = new node(value);
        let current, previous;
        current = this.head;
        if(index == null){
            insert(value);
        }
        if(index === 0) {
            node.next = this.head;
            this.head = node;
        }
        else{
            current = this.head;
            let position = 0;
            while(position < index){
                position++;
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.size++;
    }

    deleteValue = function(value) {
        let current = this.head;
        let prev = null;
        while(current != null){
            if(current.value == value){
                if(prev == null){
                    this.head = current.next;
                }
                else{
                    prev.next = current.next;
                }
                this.size--;
                return;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    deleteIndex = function(index) {

        if(index<0 || index>this.size){return alert("Insert a Valid Index")};
        let current = this.head;
        let prev = null;
        let position = 0;
        if(index === 0){
            this.head = current.next;
        }
        else{
            while(position < index){
                position++;
                prev = current;
                current = current.next;
            }
            prev.next = current.next;
        }
        this.size--;
        return current.value;
    }

    search = function(value){

        let index = 0;
        let current = this.head;

        while(current != null){
            if(current.value===value){
                return count;
            }
            count++;
            current = current.next;
        }
        return -1;

    }

}
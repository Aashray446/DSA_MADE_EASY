// Please Make LinkList Implementation 
// All possible Functions 
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
        if(index == 0) {
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

}
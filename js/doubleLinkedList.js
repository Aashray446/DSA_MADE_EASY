//Container Variable Definition 
const container = document.getElementById('animation-container')


const createNode = function(prevData, currentData, nextData) {
    const element = document.createElement('div');
    element.classList.add('node')

    // Previous Address
    var prev  = document.createElement('div');
    prev.classList.add('data');
    if( prevData == null) {
        prevData.innerHTML = ' - '
    }
    else  {
        prev.innerHTML =  prevData;
    }

    // Current Value
    var data  = document.createElement('div');
    data.classList.add('data');
    data.classList.add('value');
    data.innerHTML = currentData;

    //Next Address
    var next  = document.createElement('div');
    next.classList.add('data');
   
    if( nextData == null) {
        nextData.innerHTML = ' - '
    }
    else  {
        nextData.innerHTML =  nextData;
    }

    element.appendChild(prev)
    element.appendChild(data)
    element.appendChild(next)
    container.append(element)
      
}

const addArrow = function() {
    const element = document.createElement('div').classList.add('arrow-6')
    container.append(element)
}



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

   insert = function(value){

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

const dll = new DoublyLinkedList()
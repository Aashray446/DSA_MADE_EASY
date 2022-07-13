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
    var next = document.createElement('div');
    next.classList.add('data');
    if( nextData === null) {
        nextData.innerHTML = ' - '
    }
    else  {
        next.innerHTML =  nextData;
    }
    

    element.appendChild(prev)
    element.appendChild(data)
    element.appendChild(next)
    container.append(element)
      
}

const addArrow = function() {
    const element = document.createElement('div');
    element.classList.add('arrow-6');
    container.append(element)
}

const Pointer = function() {
    const element = document.createElement('div');
    element.classList.add('pointer');
    return element;
}


   // Pointer animation related information
    // move pointer to next node
    movePointerNext = function(){
        for (let i = 0; i < container.childElementCount; i++) {
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains('pointer')){
                container.children[i].removeChild(container.children[i].lastChild)
                container.children[i+2].appendChild(Pointer())
                return;
            }
        }
    }

   movePointerPrev = function(){
        for (let i = 0; i < container.childElementCount; i++) {
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains('pointer')){
                container.children[i].removeChild(container.children[i].lastChild)
                container.children[i-2].appendChild(Pointer())
                return;
            }
        }
    }

    getPresentPointerPos = function(){
        for (let i = 0; i < container.childElementCount; i++) {
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains('pointer')){
                return i;
            }
        }
    }

    //return a random number between 0-90
    const randomNumber = function() {
        return Math.floor(Math.random() * (90 - 0 + 1)) + 0;
    }




//  ------------------------------------ DOUBLY LINKED LIST IMPLEMENTATION ------------------------------------
class node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
        this.prevMemory = null;
        this.nextMemory= null;
        this.myMemory = null;
    }
}


class DoublyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


  //insert in doubly linked List
    insert(value) {
        const newNode = new node(value);
        newNode.myMemory = randomNumber();

        // if list is empty
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            this.size++;

            //Psuedo Memory Address
            newNode.nextMemory = " - "
            newNode.prevMemory = " - "
        
            // Drawing the node
            createNode(newNode.prevMemory, value, newNode.nextMemory)
            //add pointer to the node
            container.lastChild.appendChild(Pointer())
            return;
        }


        // if  list is not empty
        this.tail.nextMemory = newNode.myMemory;
        this.changePrevMemory(newNode.myMemory);
        newNode.prevMemory = this.tail.myMemory
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        newNode.nextMemory = " - "
        this.size++;
        addArrow();
        createNode(newNode.prevMemory, value, newNode.nextMemory)
        movePointerNext();
        return;
    }

    //insert at index
    insertAt(value, index) {
        if (index > this.size) {
            return;
        }
        if (index === 0) {
            this.insert(value);
            return;
        }
        const newNode = new node(value);
        let current = this.head;
        let count = 0;
        while (count < index - 1) {
            current = current.next;
            count++;
        }
        newNode.next = current.next;
        current.next = newNode;
        newNode.prev = current;
        newNode.next.prev = newNode;
        createNode(5, value, 5);
        this.size++;
        return;
    }


    changePrevMemory(memory){
        container.lastChild.children[2].innerHTML = memory
    }

}



const dll = new DoublyLinkedList()
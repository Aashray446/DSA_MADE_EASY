//Container Variable Definition 
const container = document.getElementById('animation-container')
const process = document.getElementById('process')
const currentNodeMemory = document.getElementById('currentNodeMemory')
const currentNodeData = document.getElementById('currentNodeData')
const currentHeadMemory = document.getElementById('currentHeadMemory')
const currentTailMemory = document.getElementById('currentTailMemory')

const nodeShowcase = document.getElementById('nodeShowcase')


function showcase_updateData(value){
    nodeShowcase.children[1].innerHTML = value
}
function showcase_updatePrev(value){
    nodeShowcase.children[0].innerHTML = value
}
function showcase_updateNext(value){
    nodeShowcase.children[2].innerHTML = value
}


// Create a div in dom for showing nodes of double link list
const createNode = function(currentData, nextData) {
    const element = document.createElement('div');
    element.classList.add('node')

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
    

    element.appendChild(data)
    element.appendChild(next)
    container.append(element)
      
}

const addArrow = function() {
    const element = document.createElement('div');
    element.classList.add('arrow-6');
    container.append(element)
}

const getPointer = function(pointerName) {
    const element = document.createElement('div');
    element.classList.add(pointerName);
    return element;
}


   // Pointer animation related information
    // move pointer to next node
    movePointerNext = function(pointerName){
        for (let i = 0; i < container.childElementCount; i++) {
            // This is two ignore the arrows 
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains(pointerName)){
                container.children[i+2].appendChild(getPointer(pointerName))
                container.children[i].removeChild(container.children[i].lastChild)
                return;
            }
        }
    }

   movePointerPrev = function(pointerName){
        for (let i = 0; i < container.childElementCount; i++) {
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains(pointerName)){
                container.children[i].removeChild(container.children[i].lastChild)
                container.children[i-2].appendChild(getPointer(pointerName))
                return;
            }
        }
    }

    getPresentPointerPos = function(pointerName){
        for (let i = 0; i < container.childElementCount; i++) {
            if(container.children[i].classList.contains('arrow-6')){
                continue;
            }
            if(container.children[i].lastChild.classList.contains(pointerName)){
                return i;
            }
        }
    }

    //return a random number between 0-90
    const randomNumber = function() {
        return Math.floor(Math.random() * (90 - 0 + 1)) + 0;
    }




//  ------------------------------------ SINGLE LINKED LIST IMPLEMENTATION ------------------------------------
class node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.nextMemory= null;
        this.myMemory = null;
    }
}


class SinglyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


  //insert in doubly linked List
   async insert(value) {
         const delay = document.getElementById('delay').value

        updateInfoScreen(process, 'Creating a new node')
        await sleep(delay)
        const newNode = new node(value);

        showcase_updateData(newNode.value)
        updateInfoScreen(currentNodeData, value);

        newNode.myMemory = randomNumber();
        updateInfoScreen(currentNodeMemory, newNode.myMemory)
        await sleep(delay)
        // if list is empty
        updateInfoScreen(process, 'Checking if list is empty')
        await sleep(delay)
        if (this.head === null) {
            updateInfoScreen(process, 'List is empty')
            await sleep(delay)
            updateInfoScreen(process, 'Setting Head to new Node')
            this.head = newNode;
            updateInfoScreen(currentHeadMemory, newNode.myMemory)
            this.size++;
            await sleep(delay)
            //Psuedo Memory Address
            newNode.nextMemory = " - "
            updateInfoScreen(process, 'Setting next memory')
            await sleep(delay)
            // Drawing the node
            updateInfoScreen(process, 'Drawing the node')
            createNode(value, newNode.nextMemory)
            await sleep(delay)
            updateInfoScreen(process, 'Node drawn')
            //add pointer to the node
            container.lastChild.appendChild(getPointer('head'))
            return;
        }


        // if  list is not empty
        updateInfoScreen(process, 'List is not empty')
        await sleep(delay)
        updateInfoScreen(process, 'Getting Tail Information')
        await sleep(delay)
        updateInfoScreen(process, 'Setting Tail to new node')
        this.tail.nextMemory = newNode.myMemory;
        updateInfoScreen(process, 'Setting previous node next memory')
        await sleep(delay)
        this.changePrevMemory(newNode.myMemory);
        await sleep(delay)
        updateInfoScreen(process, 'Setting Current Node Prev Memory')
        await sleep(delay)
        showcase_updatePrev(this.tail.myMemory)
        newNode.prevMemory = this.tail.myMemory
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        newNode.nextMemory = " - "
        this.size++;
        addArrow();
        createNode(newNode.prevMemory, value, newNode.nextMemory)
        updateInfoScreen(process, 'Node drawn')
        await sleep(delay)
        updateInfoScreen(process, 'Changing the tail')
        await sleep(delay)
        movePointerNext('tail')
        updateInfoScreen(currentTailMemory, newNode.myMemory)
        updateInfoScreen(process, 'Done')
        return;
    }

   //insert at index in single linked list
   insertAt() {

   }


    //traverse the list
    async traverse() {
    //     const delay = document.getElementById('delay').value


    //     updateInfoScreen(process, 'Traversing the list')
    //     await sleep(delay)

    //     updateInfoScreen(process, 'Getting Head Information to temp pointer')
    //     await sleep(delay)
    //     let current = this.head;
    //     container.firstElementChild.appendChild(getPointer('pointer'))

    //     updateInfoScreen(process, 'Checking if the next node is null')
    //     await sleep(delay)
    //     while (current) {
    //     updateInfoScreen(process, 'The node is not null')
    //     // Setting The data of the current node
    //     updateInfoScreen(process, 'Getting the data of the current node')
    //     await sleep(delay)
    //     updateInfoScreen(currentNodeData, current.value)
    //     updateInfoScreen(currentNodeMemory, current.myMemory)
    //         console.log(current.value);
    //         current = current.next;
    //         await sleep(delay)
    //     updateInfoScreen(process, 'Moving the pointer to the next node')
    //         await sleep(delay)
    //         if(current == null){
    //             continue
    //         }
    //         movePointerNext('pointer')
    //     }
        
    //     updateInfoScreen(process, 'The Node is null')
    //     await sleep(delay)
    //     updateInfoScreen(process, 'Removing temp pointer and terminating traversal')
    //     await sleep(delay)
    //     container.lastChild.removeChild(container.lastChild.lastChild)
    // }

    // reset() {
    //     this.head = null;
    //     this.tail = null;
    //     this.size = 0;
    //     container.innerHTML = '';
    //     updateInfoScreen(process, 'List reset')
    //     updateInfoScreen(currentHeadMemory, ' - ')
    //     updateInfoScreen(currentTailMemory, ' - ')
    //     updateInfoScreen(currentNodeMemory, ' - ')
    //     updateInfoScreen(currentNodeData, ' - ')

    }

    // CHAINING THE MEMORY
    changePrevMemory(memory){
        container.lastChild.children[2].innerHTML = memory
    }



}



const sll = new SinglyLinkedList()


// Update The infoScreen
function updateInfoScreen(element, information) {
    element.innerHTML = information;
}

// Util functions
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
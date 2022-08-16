//imports 
import { activateAccordion, sleep } from "../utils.js"

//Container Variable Definition 
const container = document.getElementById('animation-container')
const process = document.getElementById('process')
const currentNodeMemory = document.getElementById('currentNodeMemory')
const currentNodeData = document.getElementById('currentNodeData')
const currentHeadMemory = document.getElementById('currentHeadMemory')
const currentTailMemory = document.getElementById('currentTailMemory')

const nodeShowcase = document.getElementById('nodeShowcase')
const insertButton = document.getElementById('insertButton')
const traverseFromBackButton = document.getElementById('traverseFromBack')
const traverseFromFrontButton = document.getElementById('traverseFromFront')

//Controller Buttons 
const insertBtnController = document.getElementById('insertButton')
const traverseFromBackBtnController = document.getElementById('traverseFromBack')
const traverseFromFrontBtnController = document.getElementById('traverseFromFront')
const resetBtnController = document.getElementById('resetButton')

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
const createNode = function(prevData, currentData, nextData) {
    const element = document.createElement('div');
    element.classList.add('node')

    // Previous Address
    var prev  = document.createElement('div');
    prev.classList.add('data');
    prevData == null ? prev.innerHTML = 'NULL' : prev.innerHTML = prevData;

    // Current Value
    var data  = document.createElement('div');
    data.classList.add('data');
    data.classList.add('value');
    data.innerHTML = currentData;

    //Next Address
    var next = document.createElement('div');
    next.classList.add('data');
    !nextData ? nextData.innerHTML = ' - ' : next.innerHTML =  nextData;

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

const getPointer = function(pointerName) {
    const element = document.createElement('div');
    element.classList.add(pointerName);
    return element;
}


   // Pointer animation related information
    // move pointer to next node
const movePointerNext = function(pointerName){
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
const movePointerPrev = function(pointerName){
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

const disableButton = function(element) {
    element.setAttribute("disabled", "");
}

const enableButton = function(element) {
    element.removeAttribute("disabled");
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
   async insert(value) {
        
        disableButton(insertButton)
        updateInfoScreen(process, 'Creating a new node')
        await sleep(getDelay())
        const newNode = new node(value);

        showcase_updateData(newNode.value)
        updateInfoScreen(currentNodeData, value);

        newNode.myMemory = randomNumber();
        updateInfoScreen(currentNodeMemory, newNode.myMemory)
        await sleep(getDelay())
        // if list is empty
        updateInfoScreen(process, 'Checking if list is empty')
        await sleep(getDelay())
        if (this.head === null) {
            updateInfoScreen(process, 'List is empty')
            await sleep(getDelay())
            updateInfoScreen(process, 'Setting Head and tail to new node')
            this.head = newNode;
            this.tail = newNode;
            updateInfoScreen(currentHeadMemory, newNode.myMemory)
            updateInfoScreen(currentTailMemory, newNode.myMemory)
            this.size++;
            await sleep(getDelay())
            //Psuedo Memory Address
            newNode.nextMemory = " - "
            newNode.prevMemory = " - "
            showcase_updatePrev(newNode.nextMemory)
            showcase_updateNext(newNode.prevMemory)
            updateInfoScreen(process, 'Setting next and prev memory')
            await sleep(getDelay())
            // Drawing the node
            updateInfoScreen(process, 'Drawing the node')
            createNode(newNode.prevMemory, value, newNode.nextMemory)
            await sleep(getDelay())
            updateInfoScreen(process, 'Node drawn')
            //add pointer to the node
            container.lastChild.appendChild(getPointer('head'))
            container.lastChild.appendChild(getPointer('tail'))
            enableButton(insertButton)
            return;
        }


        // if  list is not empty
        updateInfoScreen(process, 'List is not empty')
        await sleep(getDelay())
        updateInfoScreen(process, 'Getting Tail Information')
        await sleep(getDelay())
        updateInfoScreen(process, 'Setting Tail to new node')
        this.tail.nextMemory = newNode.myMemory;
        updateInfoScreen(process, 'Setting previous node next memory')
        await sleep(getDelay())
        this.changePrevMemory(newNode.myMemory);
        await sleep(getDelay())
        updateInfoScreen(process, 'Setting Current Node Prev Memory')
        await sleep(getDelay())
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
        await sleep(getDelay())
        updateInfoScreen(process, 'Changing the tail')
        await sleep(getDelay())
        movePointerNext('tail')
        updateInfoScreen(currentTailMemory, newNode.myMemory)
        updateInfoScreen(process, 'Done')
        enableButton(insertButton)
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


    //traverse the list
    async traverseFromFront() {
        disableButton(traverseFromFrontButton)
        updateInfoScreen(process, 'Traversing the list')
        await sleep(getDelay())

        updateInfoScreen(process, 'Getting Head Information to temp pointer')
        await sleep(getDelay())
        let current = this.head;
        container.firstElementChild.appendChild(getPointer('pointer'))

        updateInfoScreen(process, 'Checking if the next node is null')
        await sleep(getDelay())
        while (current) {
        updateInfoScreen(process, 'The node is not null')
        // Setting The data of the current node
        updateInfoScreen(process, 'Getting the data of the current node')
        await sleep(getDelay())
        updateInfoScreen(currentNodeData, current.value)
        updateInfoScreen(currentNodeMemory, current.myMemory)
            console.log(current.value);
            current = current.next;
            await sleep(getDelay())
        updateInfoScreen(process, 'Moving the pointer to the next node')
            await sleep(getDelay())
            if(current == null){
                continue
            }
            movePointerNext('pointer')
        }
        
        updateInfoScreen(process, 'The Node is null')
        await sleep(getDelay())
        updateInfoScreen(process, 'Removing temp pointer and terminating traversal')
        await sleep(getDelay())
        container.lastChild.removeChild(container.lastChild.lastChild)
        enableButton(traverseFromFrontButton)
    }

    async traverseFromBack() {
        disableButton(traverseFromBackButton)
        updateInfoScreen(process, 'Traversing the list')
        await sleep(getDelay())

        updateInfoScreen(process, 'Getting Tail Information to temp pointer')
        await sleep(getDelay())
        let current = this.tail;
        container.lastElementChild.appendChild(getPointer('pointer'))

        updateInfoScreen(process, 'Checking if the prev node is null')
        await sleep(getDelay())
        while (current) {
        updateInfoScreen(process, 'The node is not null')
        // Setting The data of the current node
        updateInfoScreen(process, 'Getting the data of the current node')
        await sleep(getDelay())
        updateInfoScreen(currentNodeData, current.value)
        updateInfoScreen(currentNodeMemory, current.myMemory)
            current = current.prev;
            await sleep(getDelay())
        updateInfoScreen(process, 'Moving the pointer to the next node')
            await sleep(getDelay())
            if(current == null){
                continue
            }
            movePointerPrev('pointer')
        }
        
        updateInfoScreen(process, 'The Node is null')
        await sleep(getDelay())
        updateInfoScreen(process, 'Removing temp pointer and terminating traversal')
        await sleep(getDelay())
      
        container.firstElementChild.removeChild(container.firstElementChild.lastChild)
        enableButton(traverseFromBackButton)
    }

    reset() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        container.innerHTML = '';
        updateInfoScreen(process, 'List reset')
        updateInfoScreen(currentHeadMemory, ' - ')
        updateInfoScreen(currentTailMemory, ' - ')
        updateInfoScreen(currentNodeMemory, ' - ')
        updateInfoScreen(currentNodeData, ' - ')

    }

    // CHAINING THE MEMORY
    changePrevMemory(memory){
        container.lastChild.children[2].innerHTML = memory
    }



}



const dll = new DoublyLinkedList()

//get Delay Value
function getDelay() {
    return document.getElementById('delay').value
}

// Update The infoScreen
function updateInfoScreen(element, information) {
    element.innerHTML = information;
}

// Util functions

activateAccordion()

// Attaching Event Listeners
insertBtnController.addEventListener('click', () =>  dll.insert(document.getElementById('nodeData').value))
traverseFromBackBtnController.addEventListener('click', () => dll.traverseFromBack())
traverseFromFrontBtnController.addEventListener('click', () => dll.traverseFromFront())
resetBtnController.addEventListener('click', () => dll.reset())
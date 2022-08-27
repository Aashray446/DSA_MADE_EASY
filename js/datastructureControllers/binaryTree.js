import { getRandomInt, sleep} from "../utils.js";

const treeContainer = document.getElementById('tree');
let bst;

// Controller Buttons
const createBtn = document.getElementById("createBtn")
const insertBtn = document.getElementById("insertBtn")
const searchBtn = document.getElementById("searchBtn")
const randomBstBtn = document.getElementById("randomBstBtn")
const resetBtn = document.getElementById("resetBtn")

// Inputs 
const createInput =  document.getElementById('create')
const inserInput =  document.getElementById('insert')
const searchInput = document.getElementById('search')

const createValue = (value) => {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.innerText = value;
	li.appendChild(a);
	return li;
}

class binarySearchTree {


    constructor(value, firstTime) {
        this.value = createValue(value);

        if(firstTime == true) {
            const roota = document.getElementById('tree');
            const ul = document.createElement('ul');
            ul.appendChild(this.value);
            roota.appendChild(ul);
        }

        this.left = null;
        this.right = null;

    }

    insert(value) {
    if(value < parseInt(this.value.firstChild.innerText)) {

        if(this.left == null) {
            this.left = new binarySearchTree(value);
            if(this.right == null) {
                this.left.value.classList.add('left');
                const ul = document.createElement('ul')
                ul.appendChild(this.left.value);
                this.value.appendChild(ul);
            }
            else {
                this.value.lastChild.prepend(this.left.value);
            }

        } else {
            this.left.insert(value);
        }
    } else {
        if(this.right == null  ) {
            this.right = new binarySearchTree(value);
            if(this.left == null) {
                this.right.value.classList.add('right');
                const ul = document.createElement('ul')
                ul.appendChild(this.right.value);
                this.value.appendChild(ul);
            }
            else {
                this.value.lastChild.appendChild(this.right.value);
            }
        } else {
            this.right.insert(value);
        }
    }

}   
    //search in binary tree
   async search(value) {
        if(value == parseInt(this.value.firstChild.innerText)) {
            this.value.firstChild.classList.add('found');
            await sleep(4000);
            this.value.firstChild.classList.remove('found');
            return true;
        }
        else if(value < parseInt(this.value.firstChild.innerText)) {
            if(this.left == null) {
                this.left.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.left.value.firstChild.classList.remove('pointer');
                return null;
            }
            else {
                this.left.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.left.value.firstChild.classList.remove('pointer');
                return this.left.search(value);
            }
        }
        else {
            if(this.right == null) {
               
                this.right.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.right.value.firstChild.classList.remove('pointer');
                return null;
            }
            else {
                this.right.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.right.value.firstChild.classList.remove('pointer');
                return this.right.search(value);
            }
        }



    }

    reset() {
        treeContainer.innerHTML = '';
    }
        

}




const setBst = function(value) {
    if(bst!= null) {
        bst.reset();
        bst == null;
    }
        bst = new binarySearchTree(value, true);
}

const generateRandomBst = function() {
    if(bst != null) {
        bst.reset();
    }
    bst = new binarySearchTree(getRandomInt(0, 100), true);
    for(let i = 0; i < 15; i++){
        bst.insert(getRandomInt(0, 100));
    }
}


// Button Event Listners Setup
createBtn.addEventListener('click', ()=>{
    setBst(createInput.value)
})
insertBtn.addEventListener('click', () => { 
    bst.insert(inserInput.value)
})
searchBtn.addEventListener('click', () => {
    bst.search(searchInput.value)
})
randomBstBtn.addEventListener('click', () => generateRandomBst())
resetBtn.addEventListener('click', () => bst.reset())


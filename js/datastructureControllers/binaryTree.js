// import { getRandomInt, sleep} from "../utils.js";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

const treeContainer = document.getElementById('tree');
let bst;

//Input Fields
const allInputFields = document.querySelectorAll("input[type='number']");

//Error Indicator
const errorBox = document.getElementById("error1");

// Controller Buttons
const createBtn = document.getElementById("createBtn");
const insertBtn = document.getElementById("insertBtn");
const searchBtn = document.getElementById("searchBtn");
const randomBstBtn = document.getElementById("randomBstBtn");
const resetBtn = document.getElementById("resetBtn");

// Inputs 
const createInput = document.getElementById('create');
const insertInput = document.getElementById('insert');
const searchInput = document.getElementById('search');

const createValue = (value) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerText = value;
    li.appendChild(a);
    return li;
}

const clearAllInputFields = () => {
    allInputFields.forEach(field => {
        field.value = '';
    });
};

function reset() {
    bst = null;
    treeContainer.innerHTML = '';
    errorBox.style.display = "none";
    clearAllInputFields();
}

class BinarySearchTree {


    constructor(value, firstTime) {
        this.value = createValue(value);

        if (firstTime == true) {
            const roota = document.getElementById('tree');
            const ul = document.createElement('ul');
            ul.appendChild(this.value);
            roota.appendChild(ul);
        }

        this.left = null;
        this.right = null;

    }

    insert(value) {
        if (value < parseInt(this.value.firstChild.innerText)) {

            if (this.left == null) {
                this.left = new BinarySearchTree(value);
                if (this.right == null) {
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
            if (this.right == null) {
                this.right = new BinarySearchTree(value);
                if (this.left == null) {
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
        if (value == parseInt(this.value.firstChild.innerText)) {
            this.value.firstChild.classList.add('found');
            await sleep(4000);
            this.value.firstChild.classList.remove('found');
            return true;
        }
        else if (value < parseInt(this.value.firstChild.innerText)) {
            if (this.left == null) {
                //Element not found
                errorBox.style.display = "block";
                errorBox.innerHTML = "Element not found!";
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
            if (this.right == null) {
                //Element not found
                errorBox.style.display = "block";
                errorBox.innerHTML = "Element not found!";
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
}


const setBst = function (value) {
    if (bst != null) {
        bst.reset();
        bst == null;
    }
    bst = new BinarySearchTree(value, true);
}

const generateRandomBst = function () {
    if (bst != null) {
        bst.reset();
    }
    bst = new BinarySearchTree(getRandomInt(0, 100), true);
    for (let i = 0; i < 15; i++) {
        bst.insert(getRandomInt(0, 100));
    }
}


// Button Event Listners Setup
// createBtn.addEventListener('click', ()=>{
//     setBst(createInput.value)
// });

insertBtn.addEventListener('click', () => {
    if (insertInput.value === '') {
        //Don't allow show error and return
        errorBox.style.display = "block";
        errorBox.innerHTML = "Value cannot be blank!";
        return;
    } else {
        errorBox.style.display = "none";
    }
    if (bst == null) {
        bst = new BinarySearchTree(insertInput.value, true);
    } else {
        bst.insert(insertInput.value)
    }
});
searchBtn.addEventListener('click', () => {
    if (searchInput.value === '') {
        //Don't allow show error and return
        errorBox.style.display = "block";
        errorBox.innerHTML = "Value cannot be blank!";
        return;
    } 
    if (!bst) {
        errorBox.style.display = "block";
        errorBox.innerHTML = "Tree is empty!";
        return;
    }
    errorBox.style.display = "none";
    bst.search(parseInt(searchInput.value));
});
randomBstBtn.addEventListener('click', () => generateRandomBst())
resetBtn.addEventListener('click', reset);


//Imports
import { getRandomInt, sleep} from "./utils";

// Animation related Elements
const container = document.getElementById('animation-container')
const container2 = document.getElementById('animation-container2')
const structure = 'arrayBox'
const errorBox = document.getElementById("error");
const reverse = document.getElementById("reverse");


// User Input Elements
const arrayLength = document.getElementById("arrayLength");
const insertData = document.getElementById("insertData");
const index = document.getElementById("index");
const deleteAtIndex = document.getElementById("delIndex");
const deleteValue = document.getElementById("delValue");
const replaceIndex = document.getElementById("replaceIndex");
const replaceValue = document.getElementById("replaceValue");
const searchValue = document.getElementById("search");

const reverseBtn = document.getElementById("reverseBtn");
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");
const createBtn = document.getElementById("createBtn");
const replaceBtn = document.getElementById("replaceBtn");
const deleteBtn = document.getElementById("deleteBtn");
const insertBtn = document.getElementById("insertBtn");

const allInputFields = document.querySelectorAll("#simulationPanel input");
const numberFields = document.querySelectorAll("input[type='number']");

const disableAllInputFields = () => {
    allInputFields.forEach(input => {
        input.disabled = true;
    });
}

const enableAllInputFields = () => {
    allInputFields.forEach(input => {
        input.disabled = false;
    });
}

const disableAllInputFieldsExceptLength = () => {
    allInputFields.forEach(input => {
        //console.log(input);
        if (input.id === "arrayLength") {
            input.disabled = false;
        } else {
            input.disabled = true;
        }
    });
};

const clearNumberFields = () => {
    numberFields.forEach(field => {
        field.value = '';
    });
};

const createElement = (value, ind) => {
    const element = document.createElement('div');
    element.classList.add(structure)


    // Current Value
    var data = document.createElement('div');
    data.classList.add('data');
    data.innerHTML = value;

    //Next Address
    var index = document.createElement('div');
    index.classList.add('index');
    index.innerHTML = ind;


    element.appendChild(data)
    element.appendChild(index)
    //  container.append(element)

    return element;

}

class ArrayList {

    dataArray = new Array();
    reverseArray = new Array();
    arrayIndex = 0;
    length = 0;

    setLength(value) {
        this.length = parseInt(value);
        this.reset();
        if (value == '') {
            errorBox.style.display = "block";
            errorBox.innerHTML = "Please enter length";
            return;
        }
        errorBox.style.display = "block";
        errorBox.innerText = "An Array of length  " + value + " is created";
    }

    insert(value) {
        errorBox.style.display = "none";
        if (this.length == -1) {
            errorBox.style.display = "block";
            errorBox.innerHTML = "Please enter length";
            return;
        }
        if (this.isFull()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Full";
        }
        else {
            if (value == '' || value == undefined || value >= 99 || value <= -99) {
                value = getRandomInt(0, 99);
            }
            container.append(createElement(value, this.arrayIndex));
            this.dataArray.push(value);
            this.arrayIndex++;
        }

    }

    insertAtIndex(value, index) {
        if (this.isFull()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Full";
            return;
        }
        if (index == '') {
            this.insert(value);
            return;
        } else {
            if (index == 0 && this.dataArray.length == 0) {
                this.insert(value);
                return;
            }

            console.log(container.children[parseInt(index)]);
            this.dataArray.splice(parseInt(index), 0, value);
            this.arrayIndex++;
            container.children[parseInt(index)].insertAdjacentElement("beforeBegin", createElement(value, parseInt(index) + 1));
            this.replaceIndex(index);

        }

    }

    replaceIndex(index) {
        for (let i = parseInt(index); i < this.dataArray.length; i++) {
            container.children[i].children[1].innerHTML = i;
        }
    }

    deleteAll(index, value) {
        if (index == '' && value == '') {
            this.delete();
            return;
        }
        else if (index == '' && value != '') {
            this.deleteAtValue(value);
            return;
        }
        else if (value == '' && index != '') {
            this.deleteAtIndex(index);
            return;
        }
        else {
            errorBox.style.display = "block";
            errorBox.innerText = "Please enter either index or value";
        }
    }


    async delete() {

        if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            container.children[this.dataArray.length - 1].children[0].classList.add('active');
            await sleep(300);
            this.dataArray.pop();
            container.children[this.dataArray.length].remove();
            //container.children[this.dataArray.length].children[0].classList.remove('active');
            this.arrayIndex--;


        }
    }

    async deleteAtIndex(index) {

        if (index == '') {
            this.delete(value);
            return;
        }
        if (index >= this.dataArray.length) {
            errorBox.style.display = "block";
            errorBox.innerText = "Index is out of range";

        }
        else if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            container.children[index].children[0].classList.add('active');
            await sleep(300);
            container.children[index].remove();
            container.children[index].children[0].classList.remove('active');
            this.replaceIndex(index - 1)
            this.dataArray.splice(index, 1)
            //console.log(this.dataArray)
        }
    }

    async deleteAtValue(value) {
        let index = -1;
        if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            for (let i = 0; i < this.dataArray.length; i++) {
                container.children[i].children[0].classList.add('active');
                if (this.dataArray[i] == value) {
                    await sleep(300);
                    container.children[i].children[0].classList.remove('active');
                    index = i;
                    break;

                }
                await sleep(300);
                container.children[i].children[0].classList.remove('active');
            }
            if (index == -1) {
                errorBox.style.display = "block";
                errorBox.innerText = "Value is not found";
            }
            else {
                container.children[index].remove();
                this.replaceIndex(index - 1)
                this.dataArray.splice(index, 1)
            }
        }
    }


    isFull() {
        //console.log(this.dataArray.length)
        if (this.dataArray.length === this.length) {
            return true;
        }
        return false;
    }

    isEmpty() {
        if (this.dataArray.length === 0) {
            return true;
        }
        return false;
    }

    reset = function () {
        errorBox.style.display = "none";
        reverse.style.display = "none";
        container.innerHTML = ''
        container2.innerHTML = ''
        this.dataArray = new Array();
        this.arrayIndex = 0;
        clearNumberFields();
        disableAllInputFieldsExceptLength();
    }

    async search(value) {
        if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            for (let i = 0; i < this.dataArray.length; i++) {
                container.children[i].children[0].classList.add('active');
                if (this.dataArray[i] == value) {
                    await sleep(300);
                    errorBox.style.display = "block";
                    errorBox.innerText = "Value is found at index " + i;
                    container.children[i].children[0].classList.remove('active');
                    return i;

                }
                await sleep(300);
                container.children[i].children[0].classList.remove('active');
            }
            errorBox.style.display = "block";
            errorBox.innerText = "Value not found";
        }
    }

    async reverse() {
        container2.innerHTML = ' ';
        if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            errorBox.style.display = "block";
            errorBox.innerText = "Original Array";;
            for (let i = this.dataArray.length - 1; i >= 0; i--) {
                container.children[i].children[0].classList.add('active');
                this.reverseArray.push(this.dataArray[i]);
                await sleep(300);
                container.children[i].children[0].classList.remove('active');
                reverse.style.display = "block";
                reverse.innerHTML = "Reversed Array";
                container2.append(createElement(this.dataArray[i], (this.dataArray.length - i - 1)));
            }
            this.reverseArray = new Array();
            await sleep(2000);
            container2.innerHTML = '';
            reverse.style.display = "none";

        }
    }


    randomArray() {
        this.length = 10;
        this.dataArray = new Array();
        errorBox.style.display = "block";
        errorBox.innerText = "Random Array";
        container.innerHTML = ' ';
        arrayLength.value = '10';
        enableAllInputFields();
        
        for (let i = 0; i < 10; i++) {
            let a = getRandomInt(0, 99);
            this.dataArray.push(a);
            container.append(createElement(a, i));
        }
    }

    async replaceValue(index, value) {
        if (index == '' || value == '') {
            errorBox.style.display = "block";
            errorBox.innerText = "Please enter both value and index";
        }
        else if (this.dataArray.length < parseInt(index)) {
            errorBox.style.display = "block";
            errorBox.innerText = "Index is out of range";
        }
        else if (this.isEmpty()) {
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else {
            container.children[index].children[0].classList.add('active');
            await sleep(300);
            container.children[index].children[0].classList.remove('active');
            container.children[index].innerHTML = "";
            container.children[index].append(createElement(value, index));
            this.dataArray[index] = value;
        }
    }
}

const array = new ArrayList();

// Button Event Listners Setup
reverseBtn.addEventListener('click', async function () {
    // disableAllInputFields();
    this.disabled = true;
    await array.reverse()
    this.disabled = false;
    // enableAllInputFields();
});
resetBtn.addEventListener('click', () => array.reset());
randomBtn.addEventListener('click', () => array.randomArray());

searchBtn.addEventListener('click', async function () {
    disableAllInputFields();
    await array.search(searchValue.value);
    searchValue.value = '';
    enableAllInputFields();
});

replaceBtn.addEventListener('click', async function () {
    //disableAllInputFields();
    await array.replaceValue(replaceIndex.value, replaceValue.value);
    replaceIndex.value = '';
    replaceValue.value = '';
    //enableAllInputFields();
});

deleteBtn.addEventListener('click', async function () {
    array.deleteAll(deleteAtIndex.value, deleteValue.value);
    deleteAtIndex.value = '';
    deleteValue.value = '';
});

insertBtn.addEventListener('click', async function () {
    array.insertAtIndex(insertData.value, index.value);
});

createBtn.addEventListener('click', async function () {
    //console.log(arrayLength.value);
    if (arrayLength.value == '') {
        errorBox.style.display = "block";
        errorBox.innerText = 'Please enter a valid length.';
        return;
    }
    enableAllInputFields();
    array.setLength(arrayLength.value);
    //arrayLength.value = '';
});

disableAllInputFieldsExceptLength();


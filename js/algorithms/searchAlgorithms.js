function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function bblSort(arr){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < ( arr.length - i -1 ); j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j+1] = temp
            }
        }
    }
    return arr;
}

class SearchAlgorithms {
    container = document.getElementById('animation-container')
    display = document.getElementById('search-box')
    queinf = document.getElementById('queueinfo')
    speed = 600;

    structure = 'queue'

    createElement = (value) => {
        const element = document.createElement('div');
        element.classList.add(this.structure)
        element.innerHTML = `<p style="color: black; font-size: xx-large">${value}</p>`
        return element
    }

    array = new Array();
    length;
    searchtype = 'linear';

    render(){
        this.display.style.visibility = 'hidden';
        this.container.innerHTML = '';
        for (let i = 0; i < this.array.length; i++) {
            this.container.append(this.createElement(this.array[i]));
        }
    }

    add(value) {
        let enqinf = document.getElementById('enqueueinfo')
        if(value=="" || value<-99 || value>99) {
            value = Math.floor((Math.random() * 99) + 1);
            enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is added!"
            enqinf.style.display = 'block'
        } else{
            enqinf.style.display = 'none'
        }
        this.array.push(value);
        this.render();
    }

    generateRandomArray(){
        length=20;
        this.array = new Array();
        for(let i=0;i<length;i++){
            this.add(Math.floor((Math.random() * 99) + 1));
        }
        this.render();
    }

    remove(index) {
        if (index !== -1) {
            this.array.pop(index);
            this.container.lastChild.remove();
        }
        this.render();

    }

    async search(target) {
        if(this.array.length==0) {
            this.queinf.getElementsByTagName('p')[0].innerHTML = "Please add some elements to the Array !";
            this.queinf.style.display = 'block';
            return;
        }
        if(target=="") {
            this.queinf.getElementsByTagName('p')[0].innerHTML = "Please enter a value to search !";
            this.queinf.style.display = 'block';
            return;
        }
        this.queinf.style.display = 'none';
        let index = -1;
        if (this.searchtype === 'linear') {
            index = await this.linearSearch(this.array, target);
        } else {
            index = await this.binarySearch(this.array, target);
        }
        if (index !== -1) {
            this.display.style.visibility = 'visible';
            this.display.innerHTML = `<p class="text-center"> index is ${index}</p>`
            this.container.children[index].style.backgroundColor = 'green';
        } else {
            this.display.style.visibility = 'visible';
            this.display.innerHTML = `<p class="text-center"> Element not found</p>`
        }
        return index;
    }

    async linearSearch(array, target) {
        this.render()
        for (let i = 0; i < array.length; i++) {
            this.display.style.visibility = 'visible';
            this.display.innerHTML = `<p class="text-center">Checking element at index ${i}.</p>`
            this.container.children[i].style.backgroundColor = 'orange';
            if (array[i] == target) {
                return i;
            }
            await sleep(this.speed/2);
            this.container.children[i].style.backgroundColor = '#24b4a6df';
        }

        return -1;
    }

    async binarySearch(array,target) {
        array = bblSort(this.array);
        this.array=array;
        this.render()
        let left = 0;
        let right = array.length - 1;
        let mid = Math.floor((left + right) / 2);
        while (left <= right) {
            this.display.style.visibility = 'visible';
            this.display.innerHTML = `<p class="text-center">Mid is ${mid}, start is ${left}, end is ${right}</p>`
            this.container.children[mid].style.backgroundColor = 'orange';
            if (array[mid] == target) {
                return mid;
            } else if (array[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            await sleep(this.speed);
            this.container.children[mid].style.backgroundColor = '#24b4a6df';
            mid = Math.floor((left + right) / 2);
        }
        return -1;
    }

    reset() {
        this.array = new Array();
        this.container.innerHTML = '';
    }
}

let searchAlgorithms = new SearchAlgorithms();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class SortAlgorithms{
    container = document.getElementById('animation-container')
    display = document.getElementById('sort-box')
    inf = document.getElementById('queueinfo')
    isRepresentation=false;
    speed = 600;
    length = 40;

    structure = 'queue'

    isFull = () => {
        return this.array.length >= this.length;
    }

    createElement = (value) => {
        if(this.isRepresentation) {
            const element = document.createElement('div');
            element.classList.add('queue-representation');
            element.style.height = `${value*6}px`;
            return element
        }
        else {
            const element = document.createElement('div');
            element.classList.add(this.structure)
            element.innerHTML = `<p style="color: black; font-size: xx-large">${value}</p>`
            return element
        }
    }

    array = new Array();
    sorttype = 'bubble';

    render(){
        this.display.style.visibility = 'hidden';
        this.container.innerHTML = '';
        for (let i = 0; i < this.array.length; i++) {
            this.container.append(this.createElement(this.array[i]));
        }
    }

    add=(value)=>{
        if(this.isFull()) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Array is full !";
            this.inf.style.display = 'block';
            return;
        }
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

    generateRandomArray() {
        this.array = new Array();
        for (let i = 0; i < this.length; i++) {
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

    async sort() {
        if(this.array.length==0) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Please add some elements to the Array !";
            this.inf.style.display = 'block';
            return;
        }
        switch (this.sorttype) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            case 'insertion':
                await this.insertionSort();
                break;
        }
        this.render()
        this.display.style.visibility = 'visible';
        this.display.innerHTML = `<p style="color: white; font-size: large">Sorted</p>`
    }

    async bubbleSort() {
        let i, j, temp;
        for (i = 0; i < this.array.length; i++) {
            for (j = 0; j < this.array.length - i - 1; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.container.children[j].style.backgroundColor = 'orange';
                    this.container.children[j+1].style.backgroundColor = 'lightgreen';
                    await sleep(this.speed/2);
                    temp = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = temp;
                    this.render();
                    this.container.children[j].style.backgroundColor = 'lightgreen';
                    this.container.children[j+1].style.backgroundColor = 'orange';
                    await sleep(this.speed/2);
                    this.container.children[j].style.backgroundColor = '#24b4a6df';
                    this.container.children[j+1].style.backgroundColor = '#24b4a6df';

                }
            }
        }
    }

    async selectionSort() {
        let i, j, min, temp;
        for (i = 0; i < this.array.length; i++) {
            min = i;
            for (j = i + 1; j < this.array.length; j++) {
                if (this.array[j] < this.array[min]) {
                    min = j;
                }
            }
            await sleep(this.speed/3);
            this.render();
            this.container.children[min].style.backgroundColor = 'orange';
            this.container.children[i].style.backgroundColor = 'lightgreen';
            await sleep(this.speed/3);
            temp = this.array[i];
            this.array[i] = this.array[min];
            this.array[min] = temp;
            this.render();
            this.container.children[min].style.backgroundColor = 'lightgreen';
            this.container.children[i].style.backgroundColor = 'orange';
            await sleep(this.speed/3);
        }
    }

    async insertionSort() {
        let i, j, temp;
        for (i = 1; i < this.array.length; i++) {
            this.container.children[i].style.backgroundColor = 'orange';
            temp = this.array[i];
            this.display.style.visibility = 'visible';
            this.display.innerHTML = `<p style="color: white; font-size: large">Temp-> ${temp}</p>`
            j = i - 1;
            while (j >= 0 && this.array[j] > temp) {
                this.display.innerHTML = `<p style="color: white; font-size: large">Temp-> ${temp}</p>`
                this.container.children[i].style.backgroundColor = 'orange';
                if(i>=j+2) {
                    this.container.children[j + 1].style.backgroundColor = 'lightblue';
                    if(!this.isRepresentation) {
                        this.container.children[j + 2].text = `<p style="color: black; font-size: xx-large">${temp}</p>`;
                    }
                }
                this.display.style.visibility = 'visible';
                this.array[j + 1] = this.array[j];
                this.container.children[j + 1].style.backgroundColor = 'lightblue';
                if(!this.isRepresentation) {
                    this.container.children[j + 1].innerHTML = `<p style="color: black; font-size: xx-large">${temp}</p>`;
                }
                j = j - 1;
                await sleep(this.speed/3);
                this.render();
            }
            this.array[j + 1] = temp;
            this.container.children[i].style.backgroundColor = 'orange';
            if(!this.isRepresentation) {
                this.container.children[j + 1].innerHTML = `<p style="color: black; font-size: xx-large">${temp}</p>`;
            }
            this.container.children[j + 1].style.backgroundColor = 'lightblue';
            await sleep(this.speed/3);
            this.container.children[j + 1].style.backgroundColor = 'green';
            await sleep(this.speed/3);
            this.render()
        }
    }

    reset() {
        this.array = new Array();
        this.container.innerHTML = '';
    }
}

let sortAlgorithms = new SortAlgorithms();
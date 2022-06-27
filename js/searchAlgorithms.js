class SearchAlgorithms {
    container = document.getElementById('animation-container')
    structure = 'queue'

    createElement = (data) => {
        const element = document.createElement('div');
        element.classList.add(this.structure)
        element.style.backgroundColor = data?.color
        element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
        element.classList.add('circlerow')
        return element
    }

    getRandomColor = () => {
        var trans = '0.3';
        var color = 'rgba(';
        for (var i = 0; i < 3; i++) {
            color += Math.floor(Math.random() * 255) + ',';
        }
        color += trans + ')';
        return color;
    }

    wrapFR = (value, isfront) => {
        if(isfront) {
            return `<p class="text-center">Front is ${value}</p>`
        }
        return `<p class="text-center">Rear is ${value}</p>`
    }

    array = new Array();
    length;
    searchtype = 'binary';

    init(length) {
        this.length = length;
    }

    render(){
        this.container.innerHTML = '';
        for (let i = 0; i < this.array.length; i++) {
            this.container.append(this.createElement({'value': this.array[i], 'color': this.getRandomColor()}))
        }
    }

    add(value) {
        if(value=="" || value<-99 || value>99) {
            value = Math.floor((Math.random() * 99) + 1);
        }
        this.array.push(value);
        if(this.searchtype === 'binary') {
            this.array.sort();
        }
        this.render();
    }

    remove(index) {
        if(this.searchtype === 'binary') {
            this.array.sort();
        }
        if (index !== -1) {
            this.array.pop(index);
            this.container.lastChild.remove();
        }
        this.render();

    }

    search(target) {
        let index = -1;
        if (this.searchtype === 'linear') {
            index = this.linearSearch(this.array, target);
        } else {
            index = this.binarySearch(this.array, target);
        }
        return index;
    }

    linearSearch(array, target) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === target) {
                return i;
            }
        }
        return -1;
    }

    binarySearch(array, target) {
        let left = 0;
        let right = array.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (array[mid] === target) {
                return mid;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    reset() {
        this.array = new Array();
    }
}

let searchAlgorithms = new SearchAlgorithms();
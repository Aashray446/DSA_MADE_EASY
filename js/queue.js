const container = document.getElementById('animation-container')
const structure = 'queue'

const createElement = function(value) {
    const element = document.createElement('div');
    element.classList.add(structure)
    element.style.backgroundColor=getRandomColor()
    if(value==null) {
        element.innerHTML = '-'
    }
    else {
        element.innerHTML = value
    }
    container.append(element)
}

function getRandomColor() {
    var trans = '0.3';
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
        color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')';
    return color;
}



class Queue {
    dataArray = new Array();
    length=15;

    enqueue(value) {
        console.log("here",value)
        if(this.dataArray.length > this.length) {
            window.alert("Queue overflow")
        }
        else {
            document.getElementById('enqueueData').innerHTML = value
            createElement(value)
            this.dataArray.push(value)
        }
    }

    dequeue() {
        if(this.dataArray.length == 0) {
            window.alert("Queue Underflow")
        }
        const list = document.getElementsByClassName(structure)
        list[0].remove()
        document.getElementById('dequeueData').innerHTML = this.dataArray.pop()
    }

    reset = () => {
        container.innerHTML = ''
        this.dataArray = new Array();
    }
}

let queue = new Queue()






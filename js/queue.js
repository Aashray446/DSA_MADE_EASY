const container = document.getElementById('animation-container')
const structure = 'queue'

const createElement = (data) => {
    const element = document.createElement('div');
    element.classList.add(structure)
    element.style.backgroundColor=data?.color
    element.innerHTML = data?.value
    container.append(element)
}


const getRandomColor = () => {
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
    front=-1;
    rear=-1;
    length=15;
    detailed=false;

    qf = document.getElementById('queueFront')
    qr = document.getElementById('queueRear')
    inf = document.getElementById('queueinfo')

    enqueue(value) {
        if(this.isFull()) {
            this.inf.innerHTML = "Queue Overflow! Queue is full!"
            this.inf.style.display = 'block'
        }
        else {
            let enqinf = document.getElementById('enqueueinfo')
            if(value=="") {
                enqinf.innerHTML = "Random no is taken for Enqueue!"
                enqinf.style.display = 'block'
                value = Math.floor((Math.random() * 10) + 1);
            } else {
                enqinf.style.display = 'none'
            }
            this.inf.style.display = 'none'
            const bg_color = getRandomColor()
            this.qr.innerHTML = "Rear\n--> " + value
            this.qr.style.backgroundColor = bg_color
            createElement({'value': value, 'color': bg_color})
            this.dataArray.push(value)
            if (this.rear == -1) {
                this.front = 0;
                this.qf.innerHTML = "Front\n--> "+this.dataArray[this.front]
                this.rear = 0;
                this.qf.style.display = 'block'
                this.qr.style.display = 'block'
            } else {
                this.rear++;
            }
        }
    }

    dequeue() {
        if(this.isEmpty()) {
            this.inf.innerHTML = "Queue Underflow! Queue is empty!"
            this.inf.style.display = 'block'
        } else {
            this.inf.style.display = 'none'
            const list = document.getElementsByClassName(structure)
            if(this.detailed){
                list[this.front].style.backgroundColor = '#1e424e'
                list[this.front].style.color = '#1e424e'
                list[this.front].style.border = '1px solid gray'
            }else{
                list[0].remove()
                this.qf.innerHTML = "Front\n--> "+
                this.dataArray?.pop()
                this.qf.style.backgroundColor = list[0]?.style?.backgroundColor
            }
            this.front++;
        }
        if(this.dataArray.length == 0 || this.front > this.rear) {
            this.front = -1;
            this.rear = -1;
        }
        console.log(this.rear,this.front)
    }

    isFull() {
        if(this.dataArray.length > this.length) {
            return true;
        }
        return false;
    }

    isEmpty() {
        if(this.front == -1) {
            this.qf.innerHTML = 'Front -1'
            this.qr.innerHTML = 'Rear -1'
            return true;
        }
        return false;
    }

    reset = () => {
        this.inf.style.display = 'none'
        this.qr.innerHTML = ""
        this.qf.innerHTML = ""
        container.innerHTML = ''
        this.dataArray = new Array();
    }
}

let queue = new Queue()






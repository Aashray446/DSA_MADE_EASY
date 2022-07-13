const container = document.getElementById('animation-container')
const structure = 'queue'

const createElement = (data) => {
    const element = document.createElement('div');
    element.classList.add(structure)
    element.style.backgroundColor=data?.color
    element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
    return element
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

const wrapFR = (value, isfront) => {
    if(isfront) {
        return `<p class="text-center">Front is ${value}</p>`
    }
    return `<p class="text-center">Rear is ${value}</p>`
}


class Queue {
    dataArray = new Array();
    front=-1;
    rear=-1;
    length=15;
    detailed=false;
    isdeque=false;

    qf = document.getElementById('queueFront')
    qr = document.getElementById('queueRear')
    inf = document.getElementById('queueinfo')

    enqueue=(value)=>{
        
        if(this.isFull()) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Overflow! Queue is full!"
            this.inf.style.display = 'block'
        }
        else {
            let enqinf = document.getElementById('enqueueinfo')
            if(value=="" || value<-99 || value>99) {
                enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is taken for Enqueue!"
                enqinf.style.display = 'block'
                value = Math.floor((Math.random() * 99) + 1);
            } else {
                enqinf.style.display = 'none'
            }
            this.inf.style.display = 'none'
            const bg_color = getRandomColor()
            this.qr.innerHTML = wrapFR(value, false)
            this.qr.style.backgroundColor = bg_color
            container.append(createElement({'value': value, 'color': bg_color}))
            this.dataArray.push(value)
            if (this.detailed){
                this.qf.innerHTML = wrapFR(this.dataArray[this.front],true)
            }
            if (this.rear == -1) {
                this.front = 0;
                this.qf.innerHTML = wrapFR(this.dataArray[this.front],true)
                this.rear = 0;
                this.qf.style.display = 'flex'
                this.qr.style.display = 'flex'
            } else {
                this.rear++;
            }
        }

    }

    enqueueFront=(value)=>{
        if(this.isFull()) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Overflow! Queue is full!"
            this.inf.style.display = 'block'
        }
        else {
            let enqinf = document.getElementById('enqueueinfo')
            if(value=="" || value<-99 || value>99) {
                enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is taken for Enqueue!"
                enqinf.style.display = 'block'
                value = Math.floor((Math.random() * 99) + 1);
            } else {
                enqinf.style.display = 'none'
            }
            this.inf.style.display = 'none'
            const bg_color = getRandomColor()
            this.qf.innerHTML = wrapFR(value, true)
            this.qf.style.backgroundColor = bg_color
            container.prepend(createElement({'value': value, 'color': bg_color}))
            this.dataArray.unshift(value)
            if (this.rear == -1) {
                this.rear = 0;
                this.qf.innerHTML = wrapFR(this.dataArray[this.rear],true)
                this.front = 0;
                this.qf.style.display = 'flex'
                this.qr.style.display = 'flex'
            } else {
                this.rear++;
            }
        }
    }

    dequeue=()=>{
        if(this.isEmpty()) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            this.inf.style.display = 'block'
        } else {
            this.inf.style.display = 'none'
            const list = document.getElementsByClassName(structure)
            if(this.detailed){
                if(list[this.front]) {
                    list[this.front].style.opacity = '0.1'
                }
                if (this.dataArray[this.front+1]) {
                    this.qf.innerHTML = wrapFR(this.dataArray[this.front+1],true)
                } else {
                    this.qf.innerHTML = wrapFR(-1,true)
                    this.qr.innerHTML = wrapFR(-1,false)
                }
                this.front++;
            }else{
                list[0].remove()
                this.dataArray?.pop()
                this.qf.innerHTML = wrapFR(list[0]?.getElementsByTagName('p')[0]?.innerHTML || -1,true)
                this.qf.style.backgroundColor = list[0]?.style?.backgroundColor
                this.front++;
            }
        }
        if(this.dataArray.length == 0 || this.front>this.rear+1) {
            if(!this.detailed) {
                this.front = -1;
                this.rear = -1;
            } else{
                this.front--;
                this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
                this.inf.style.display = 'block'
            }
            console.log(this.dataArray.length,this.length,"this")
            this.qf.innerHTML = wrapFR(-1,true)
            this.qr.innerHTML = wrapFR(-1,false)
        }
    }

    dequeueRear=()=> {
        if (this.isEmpty()) {
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            this.inf.style.display = 'block'
        } else {
            this.inf.style.display = 'none'
            const list = document.getElementsByClassName(structure)
            if (this.detailed) {
                if (list[this.rear]) {
                    list[this.rear].style.opacity = '0.1'
                }
                if (this.dataArray[this.rear - 1]) {
                    this.qr.innerHTML = wrapFR(this.dataArray[this.rear - 1], false)
                } else {
                    this.qf.innerHTML = wrapFR(-1, true)
                    this.qr.innerHTML = wrapFR(-1, false)
                }
                this.rear--;
            } else {
                list[list.length - 1].remove()
                this.dataArray?.pop()
                this.qr.innerHTML = wrapFR(list[list.length - 1]?.getElementsByTagName('p')[0]?.innerHTML || -1, false)
                this.qr.style.backgroundColor = list[list.length - 1]?.style?.backgroundColor
                this.rear--;
            }
        }
        if (this.dataArray.length == 0 || this.front > this.rear + 1) {
            if (!this.detailed) {
                this.front = -1;
                this.rear = -1;
            } else {
                this.rear--;
                this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
                this.inf.style.display = 'block'
            }
            this.qf.innerHTML = wrapFR(-1, true)
            this.qr.innerHTML = wrapFR(-1, false)
        }
    }

    isFull=()=>{
        if(this.dataArray.length > this.length) {
            return true;
        }
        return false;
    }

    isEmpty=()=>{
        if(this.front == -1) {
            this.qf.innerHTML = wrapFR(-1,true)
            this.qr.innerHTML = wrapFR(-1,false)
            return true;
        }
        return false;
    }

    reset = () => {
        this.inf.style.display = 'none'
        this.qf.innerHTML = wrapFR(-1,true)
        this.qr.innerHTML = wrapFR(-1,false)
        container.innerHTML = ''
        this.dataArray = new Array();
        this.front=-1;
        this.rear=-1;
    }

    toggledeque = () => {
        if(this.isdeque) {
            this.qf.style.display = 'flex'
            this.qr.style.display = 'flex'
            document.getElementById('dequeuerearbutton').style.display = 'block'
            document.getElementById('enqueuefrontbutton').style.display = 'block'
            document.getElementById('enqueuebuttongroup').classList.add('grid-cols-2')
            document.getElementById('dequeuebuttongroup').classList.add('grid-cols-2')
        } else {
            this.qf.style.display = 'none'
            this.qr.style.display = 'none'
            document.getElementById('dequeuerearbutton').style.display = 'none'
            document.getElementById('enqueuefrontbutton').style.display = 'none'
            document.getElementById('enqueuebuttongroup').classList.remove('grid-cols-2')
            document.getElementById('dequeuebuttongroup').classList.remove('grid-cols-2')
        }
    }
}

let queue = new Queue()






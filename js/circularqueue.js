const container = document.getElementById('animation-container')
const structure = 'circularqueue'
const qf = document.getElementById('queueFront')
const qr = document.getElementById('queueRear')
const inf = document.getElementById('queueinfo')
const enqinf = document.getElementById('enqueueinfo')

const createElement = (data) => {
    const element = document.createElement('div');
    element.classList.add(structure)
    element.style.backgroundColor=data?.color
    element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
    container.append(data)
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

class Circularqueue(){
    array = new Array();
    front = -1;
    rear = -1;
    length = 15;

    enqueue(value){
        if(isfull){
            inf.getElementsByTagName('p')[0].innerHTML = "Queue Overflow! Queue is full!"
            inf.style.display = 'block'
            return false;
        }

        if(value=="" || value<-99 || value>99) {
            enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is taken for Enqueue!"
            enqinf.style.display = 'block'
            value = Math.floor((Math.random() * 100) + 1);
        } else {
            enqinf.style.display = 'none'
        }

        const bg_color = getRandomColor()
        createElement({'value': value, 'color': bg_color})
        if(isEmpty()){
            rear=front=0;
            array[rear]=value;
        } else{
            rear=(rear+1)%this.length;
            array[rear]=value;
        }
        this.inf.style.display = 'none'
        qr.innerHTML = wrapFR(array[rear], false)
        qf.innerHTML = wrapFR(array[front], true)
        return true;
    }

    dequeue(){
        qr.innerHTML = wrapFR(value, false)
        qf.innerHTML = wrapFR(value, true)
        if(value=="" || value<-99 || value>99) {
            enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is taken for Enqueue!"
            enqinf.style.display = 'block'
            value = Math.floor((Math.random() * 100) + 1);
        } else {
            enqinf.style.display = 'none'
        }
        if(isEmpty()){
            inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            inf.style.display = 'block'
            return false;
        }
        if(this.front==this.rear){
            this.front=this.rear=-1;
        } else{
            this.front=(this.front+1)%this.length;
        }
        this.inf.style.display = 'none'
        return true;
    }

    isfull(){
        if((this.rear+1)%this.length==this.front){
            return true;
        }
        return false;
    }

    isEmpty(){
        if(this.rear==this.front && this.front==-1){
            return true;
        }
        return false;
    }
}
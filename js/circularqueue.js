
class Circularqueue{
    container = document.getElementById('animation-container')
    structure = 'queue'

    qf = document.getElementById('queueFront') || queue.qf
    qr = document.getElementById('queueRear') || queue.qr
    inf = document.getElementById('queueinfo') || queue.inf

    createElement = (data) => {
        const element = document.createElement('div');
        element.classList.add(this.structure)
        element.style.backgroundColor=data?.color
        element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
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
    front = -1;
    rear = -1;
    length = 15;
    isactive=false;

    enqueue=(value)=>{
        console.log("circular enqueuing")
        if(this.isFull()){
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Overflow! Queue is full!"
            this.inf.style.display = 'block'
            return false;
        }

        let enqinf = document.getElementById('enqueueinfo')
        if(value=="" || value<-99 || value>99) {
            enqinf.getElementsByTagName('p')[0].innerHTML = "Random number is taken for Enqueue!"
            enqinf.style.display = 'block'
            value = Math.floor((Math.random() * 99) + 1);
        } else {
            enqinf.style.display = 'none'
        }

        const bg_color = getRandomColor()
        console.log(this.container.children)
        let element = this.createElement({'value': value, 'color': bg_color})
        console.log("isempt",this.isEmpty())
        if(this.isEmpty()){
            this.rear=this.front=0;
            this.array[this.rear]=value;
            this.container.replaceChild(element,this.container.children[this.rear])
        } else{
            this.rear=(this.rear+1)%this.length;
            this.array[this.rear]=value;
            this.container[this.rear]=value;
            this.container.replaceChild(element, this.container.children[this.rear])
        }
        this.inf.style.display = 'none'
        this.qr.innerHTML = this.wrapFR(this.array[this.rear]||-1, false)
        this.qf.innerHTML = this.wrapFR(this.array[this.front]||-1, true)
        return true;
    }

    dequeue=()=>{
        console.log("circular dequeuing")
        if(this.isEmpty()){
            this.inf.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            this.inf.style.display = 'block'
            return false;
        }
        this.container.insertBefore(this.createElement({'value': '-', 'color': 'rgba(255,255,255,0)'}), this.container.children[this.front])
        this.container.removeChild(this.container.children[this.front+1])
        if(this.front==this.rear){
            this.front=-1;
            this.rear=-1;
        } else{
            this.front=(this.front+1)%this.length;
        }
        this.inf.style.display = 'none'
        this.qr.innerHTML = this.wrapFR(this.array[this.rear]||-1, false)
        this.qf.innerHTML = this.wrapFR(this.array[this.front]||-1, true)
        return true;
    }

    isFull=()=>{
        console.log(this.front, this.rear)
        if((this.rear+1)%this.length==this.front){
            return true;
        }
        return false;
    }

    isEmpty=()=>{
        console.log(this.front, this.rear)
        if(this.rear==this.front && this.front==-1){
            return true;
        }
        return false;
    }

    reset=()=>{
        console.log("circular resetting")
        this.array = new Array();
        this.front = -1;
        this.rear = -1;
        this.container.innerHTML = '';
        if(this.isactive) {
            for (let i = 0; i < this.length; i++) {
                this.container.append(this.createElement({'value': '-', 'color': 'rgba(255,255,255,0)'}));
            }
        }else {
            for (let i = 0; i < this.length; i++) {
                this.container.firstChild.remove();
            }
        }

    }

    handlengthchange=()=>{
        for(let i=0; i<this.length; i++){
            this.container.children[i] || this.container.append(this.createElement({'value': '-', 'color': 'rgba(255,255,255,0)'}))
        }
        if(this.container.children.length>this.length){
            for (let i=this.length; i<this.container.children.length; i++){
                this.container.children[i].remove()
            }
        }
    }
}

let circularqueue = new Circularqueue();
class Node {
    constructor(key, value, color = getRandomColor()) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.previous = null;
        this.color=color;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomColor() {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    return color;
}

const container = document.getElementById('animation-container')
const info = document.getElementById('info')

class SortedPriorityQueue {
    isSorted = true;
    head = null;
    tail = null;
    speed = 300;

    isEmpty = () => {
        if(this.tail == null && this.head == null){
            return true;
        }
        return false;
    }

    enqueue = async (key, value) => {
        if (parseInt(key) < 1 || parseInt(key) > 99) {
            info.getElementsByTagName('p')[0].innerHTML = "Key must be from 1 to 99!"
            info.style.display = 'block'
            return;
        }
        if (parseInt(value) < -99 || parseInt(value) > 99) {
            info.getElementsByTagName('p')[0].innerHTML = "Value must be from -99 to 99!"
            info.style.display = 'block'
            return;
        }
        if (key == '' || value == '') {
            info.getElementsByTagName('p')[0].innerHTML = "Key and value must not be empty!"
            info.style.display = 'block'
            return;
        }
        let start = this.head;
        let temp = new Node(key, value);
        if (this.isEmpty()) {
            this.head = temp;
            this.tail = temp;
        } else {
            let count = 0;
            if (this.head.key > key) {
                temp.next = this.head;
                this.head.previous = temp;
                this.head = temp;
            } else {
                while (start != null) {
                    await sleep(this.speed);
                    if(container.children[count]) {
                        container.children[count].style.backgroundColor = 'lightgreen';
                    }
                    await sleep(this.speed);
                    if(container.children[count]) {
                        container.children[count].style.backgroundColor = start.color;
                    }
                    if(container.children[count+1]) {
                        container.children[count + 1].innerHTML = `<p style="color: yellow; font-size: large">>-<</p>`
                    }
                    await sleep(this.speed);
                    if(container.children[count+1]) {
                        container.children[count+1].innerHTML = `<p style="color: white; font-size: large"><-></p>`;
                    }
                    await sleep(this.speed);
                    if (Number.parseInt(start.key) > Number.parseInt(temp.key)) {
                        temp.next = start;
                        temp.previous = start.previous;
                        start.previous.next = temp;
                        start.previous = temp;
                        this.generate();
                        return;
                    }
                    count+=2;
                    start = start.next;
                }
                this.tail.next = temp;
                temp.previous = this.tail;
                this.tail = temp;
            }
        }
        this.generate();
        return;
    }

    dequeue = async () => {
        console.log("sorted dequeue")
        if (this.isEmpty()) {
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
            return null;
        }
        container.children[0].style.backgroundColor = 'red';
        await sleep(this.speed);
        let temp = this.head
        if (temp !== null) {
            this.head = temp.next;
            if (this.head !== null) {
                this.head.previous = null;
            } else {
                this.tail = null;
                this.head = null;
            }
        }
        this.size();
        this.generate();
        return temp;
    }

    min = () => {
        if(this.isEmpty()){
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
            return null;
        }
        return this.head;
    }

    size = () => {
        let count = 0;
        let node = this.head;
        while(node !== null){
            count+=1;
            node = node.next;
        }
        return count;
    }

    createelement = (data) => {
        const element = document.createElement('div');
        element.classList.add('sudo-pqueue')
        element.style.backgroundColor = data.color;
        element.innerHTML = `
            <div class="sudo-pqueue-prev" style="color: white; font-size: large; background: ${data?.previous?.color}">${data?.previous?.value ? data.previous.key : '-'}</div>
            <div class="sudo-pqueue-key" style="text-shadow: 2px 2px 2px black; font-size: large; ">${data?.key}</div>
            <div class="sudo-pqueue-value" style="text-shadow: 2px 2px 2px black; color: white; font-size: large; ">${data?.value}</div>
            <div class="sudo-pqueue-next" style="color: white; font-size: large; background: ${data?.next?.color}">${data?.next?.value ? data.next.key : '-'}</div>
        `;
        return element
    }

    inb = () => {
        const element = document.createElement('div');
        element.classList.add('pqueue-connect')
        element.innerHTML = `<p style="color: white; font-size: large"><-></p>`
        return element
    }


    generate = () => {
        info.style.display = 'none'
        document.getElementById('peekindex').innerHTML = this?.head?.key ? this.head.key : '-';
        document.getElementById('sizearea').innerHTML = this.size();
        container.innerHTML = '';
        let node = this.head;
        while(node !== null){
            let element = this.createelement({
                key : node?.key ? node.key : '-',
                value : node?.value ?  node.value : '-',
                next : node?.next,
                previous : node?.previous,
                color : node?.color
            })
            container.append(element)
            if(node.next){
                container.append(this.inb())
            }
            node = node.next;
        }
    }


    reset = () => {
        this.head = null;
        this.tail = null;
        this.generate();
    }

}

let sortedPriorityQueue = new SortedPriorityQueue();
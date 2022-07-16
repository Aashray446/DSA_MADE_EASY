class UnsortedPriorityQueue {
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
        let node = new Node(key, value);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
        this.generate();
    }

    dequeue = async () => {
        if (this.isEmpty()) {
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(min, null);
        let node = this.head;
        let count = 0;
        let count2 = 0;
        while (node !== null) {
            await sleep(this.speed);
            if (container.children[count]) {
                container.children[count].style.backgroundColor = 'blue';
            }
            await sleep(this.speed);
            if (container.children[count]) {
                container.children[count].style.backgroundColor = node.color;
            }
            if (container.children[count + 1]) {
                container.children[count + 1].innerHTML = `<p style="color: yellow; font-size: large">>-<</p>`
            }
            await sleep(this.speed);
            if (container.children[count + 1]) {
                container.children[count + 1].innerHTML = `<p style="color: white; font-size: large"><-></p>`;
            }
            await sleep(this.speed);
            if (parseInt(node.key) < min) {
                min = node.key;
                minNode = node;
                count2 = count;
            }
            count += 2;
            node = node.next;
        }
        await sleep(this.speed);
        if (container.children[count2]) {
            container.children[count2].style.backgroundColor = 'red';
        }
        await sleep(this.speed);
        if (container.children[count2]) {
            container.children[count2].style.backgroundColor = minNode.color;
        }
        if(minNode.previous != null) {minNode.previous.next = minNode.next;}
        if(minNode.next != null){minNode.next.previous = minNode.previous;}
        if(minNode == this.head){this.head = minNode.next;}
        if(minNode == this.tail){this.tail = minNode.previous;}
        this.generate();
        return node;
    }

    min = () => {
        if(this.isEmpty()){
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(null, null);
        let node = this.head;
        while(node !== null){
            if(parseInt(node.key) < min){
                min = node.key;
                minNode = node;
            }
            node = node.next;
        }
        return minNode;
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
        document.getElementById('peekindex').innerHTML = this?.min()?.key ? this.min().key : '-';
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
        container.innerHTML = '';
    }
}

let unsortedpriorityqueue = new UnsortedPriorityQueue();
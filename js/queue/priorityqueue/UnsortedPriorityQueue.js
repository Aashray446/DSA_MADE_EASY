class UnsortedPriorityQueue {
    head = null;
    tail = null;
    speed = 300;

    isEmpty = () => {
        if(this.head == this.tail && this.head == null){
            return true;
        }
        return false;
    }

    enqueue = (key, value) => {
        let node = new Node(key, value);
        if(this.isEmpty()){
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
        this.size();
    }

    dequeue = () => {
        if(this.isEmpty()){
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(min, null);
        let node = this.head;
        while(node !== null){
            if(node.key < min){
                min = node.key;
                minNode = node;
            }
            node = node.next;
        }
        node = minNode;
        if(this.head==minNode){
            if(minNode.next != null){
                this.head = minNode.next;
            } else {
                this.head = null;``
            }
        }
        if(this.tail==minNode){
            if(minNode.previous != null){
                this.tail = minNode.previous;
            } else {
                this.tail = null;
            }
        }
        if(minNode.previous != null){
            minNode.previous.next = minNode.next;
        }
        if(minNode.next != null){
            minNode.next.previous = minNode.previous;
        }
        this.size();
        return node;
    }

    min = () => {
        if(this.isEmpty){
            info.getElementsByTagName('p')[0].innerHTML = "Queue Underflow! Queue is empty!"
            info.style.display = 'block'
        }
        let min = Number.MAX_VALUE;
        let minNode = new Node(min, null);
        let node = this.head;
        while(node !== null){
            if(node.key < min){
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
            console.log(node.key, node.value)
            count+=1;
            node = node.next;
        }
        return count;
    }

    reset = () => {
        this.head = null;
        this.tail = null;
    }
}

let unsortedpriorityqueue = new UnsortedPriorityQueue();
class Deque {
    array = new Array();
    front = -1;
    rear = -1;
    length = 0;

    isFull = () => {
        if ((this.rear+1) % length == this.front){
            return true;
        }
        return false;
    }

    isEmpty = () => {
        if(this.rear==this.front && this.front==-1){
            return true;
        }
        return false;
    }

    reset = () => {
        this.array = new Array();
        this.front = -1;
        this.rear = -1;
    }

    pushFront = (value) => {
        if (this.isFull()) {
            window.alert("Deque is full")
        }
        if (this.isEmpty()){
            this.rear = this.front = 0;
            this.array[this.rear] = value;
        } else {
            this.rear = (this.rear + 1) % this.length;
            this.array[this.rear] = value;
        }
        return true;
    }

    pushRear = (value) => {
        if (this.isFull()) {
            window.alert("Deque is full")
        }
        if (this.isEmpty()){
            this.rear = this.front = 0;
            this.array[this.rear] = value;
        }
        else {
            this.front = (this.front +  this.length-1) % this.length;
            this.array[this.front] = value;
        }
        return true;
    }

    popFront = () => {
        if (this.isEmpty()) {
            window.alert("Deque is empty")
        }
        if (this.rear==this.front){
            this.rear=this.front=-1;
        } else {
            let v = this.array[this.front];
            this.front = (this.front + 1) % this.length;
            return v;
        }
        return -1;
    }

    popRear = () => {
        if (this.isEmpty()) {
            window.alert("Deque is empty")
        }
        if (this.rear==this.front){
            this.rear=this.front=-1;
        } else {
            let v = thi.array[this.front];
            this.rear = (this.rear + this.length-1) % this.length;
            return v;
        }
        return -1;
    }

    peekFront = () => {
        if (this.isEmpty()) {
            window.alert("Deque is empty")
        } else {
            return this.array[this.front%length];
        }
    }

    peekRear = () => {
        if (this.isEmpty()) {
            window.alert("Deque is empty")
        } else {
            return this.array[this.rear%length];
        }
    }

}

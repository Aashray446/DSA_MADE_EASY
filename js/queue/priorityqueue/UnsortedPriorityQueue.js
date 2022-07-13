class UnsortedPriorityQueue{
    constructor(){
        this.queue = [];
    }
    enqueue(element){
        this.queue.push(element);
    }
    dequeue(){
        return this.queue.shift();
    }
    isEmpty(){
        return this.queue.length === 0;
    }
    peek(){
        return this.queue[0];
    }
    print(){
        console.log(this.queue);
    }
}
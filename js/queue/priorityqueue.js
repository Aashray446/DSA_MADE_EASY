class SortedPriorityQueue {
  constructor() {
    this.queue = [];
    this.length = 0;
  }

  enqueue(item, priority) {
  if(this.isFull()){
        return false;
  }
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift().item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  isFull() {
    return this.queue.length === this.length;
  }
}
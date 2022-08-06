// Your task is to write a CircularQueue class that implements a circular queue for arbitrary objects. The class should obtain the buffer size with an argument provided to the constructor, and should provide the following methods:

// enqueue to add an object to the queue
// dequeue to remove (and return) the oldest object in the queue. It should return null if the queue is empty.
// You may assume that none of the values stored in the queue are null (however, null may be used to designate empty spots in the buffer).

class CircularQueue {
  constructor(size) {
    this.size = size;
    this.queue = [];
  }

  enqueue(val) {
    this.queue.push(val);
    if (this.queue.length > this.size) this.dequeue();
  }

  dequeue() {
    if (this.queue.length) {
      return this.queue.shift();
    } else {
      return null;
    }
  }
}


let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);

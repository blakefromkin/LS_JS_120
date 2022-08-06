// What will this log?
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());

// A: This will log "ByeBye" and then "HelloHello". Something.dupData is the static method, while thing.dupData is the instance method. 

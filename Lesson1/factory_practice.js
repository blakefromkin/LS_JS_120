/*
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description
*/

// Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:
//"Me Talk Pretty one day was written by David Sedaris."

let mythos = {
  title: 'Mythos',
  author: 'Stephen Fry',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }
}

let talk = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }
}

let aunts = {
  title: "Aunts Aren't Gentlemen",
  author: 'PG Wodehouse',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }
}


// Create a factory function to make these books
function createBook(title, author) {
  return {
    title,
    author,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

// Update the factory function so that it returns a book object that includes a property read that has an initial value of false.
function createBook(title, author) {
  return {
    title,
    author,
    read: false,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    }
  };
}

// Suppose that we want to add a book that we've already read. Modify the factory function to use an optional read parameter with a default value of false.
// And add a method, readBook, that marks a book object as read by setting the read property to true
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    },

    readBook() {
      this.read = true;
    }
  };
}

// Finally, let's update getDescription function to reflect the read state directly
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}. ` +
            `I ${this.read ? 'have' : "haven't"} read it.`; // NOTE TERNARY USE!
    },

    readBook() {
      this.read = true;
    }
  };
}
let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

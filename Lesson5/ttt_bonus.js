let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) { // This argument is strictly for debugging purposes
    this.marker = marker;
  }

  toString() { // Overrides Object.prototype's built-in toString method
    return this.marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log('');
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class Scoreboard {
  static WINNING_SCORE = 3;
  constructor() {
    this.humanScore = 0;
    this.computerScore = 0;
  }

  humanWinsMatch() {
    return this.humanScore === Scoreboard.WINNING_SCORE;
  }

  computerWinsMatch() {
    return this.computerScore === Scoreboard.WINNING_SCORE;
  }

  incrementScore(gameWinner) {
    if (gameWinner === 'human') this.humanScore += 1;
    if (gameWinner === 'computer') this.computerScore += 1;
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.scoreboard = new Scoreboard();
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.playOneGame();
      this.updateScoreboard();
      if (this.returnMatchWinner()) {
        this.announceMatchWinner();
        break;
      } else {
        this.displayResults();
        this.reportScore();
      }

      if (this.playAgain()) {
        this.board = new Board();
        console.clear();
      } else break;
    }
    this.displayGoodbyeMessage();
  }

  playOneGame() {
    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    console.clear();
    console.log('');
    this.board.markSquareAt(choice, Square.HUMAN_MARKER);
  }

  computerMoves() {
    let marker = this.computer.getMarker();
    if (this.board.squares['5'].getMarker() === Square.UNUSED_SQUARE) {
      this.board.markSquareAt('5', marker);
      return;
    }

    let choice = this.findAtRiskSquare(this.computer); // OFFENSIVE
    if (choice) {
      this.board.markSquareAt(choice, marker);
      return;
    } else choice = this.findAtRiskSquare(this.human); // DEFENSIVE
    if (choice) {
      this.board.markSquareAt(choice, marker);
      return;
    }

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!this.board.unusedSquares().includes(choice));

    this.board.markSquareAt(choice, marker);
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  updateScoreboard() {
    if (this.isWinner(this.human)) this.scoreboard.incrementScore('human');
    if (this.isWinner(this.computer)) this.scoreboard.incrementScore('computer');
  }

  reportScore() {
    console.log(`Current scores => You: ${this.scoreboard.humanScore} Computer: ${this.scoreboard.computerScore}`);
  }

  returnMatchWinner() {
    if (this.scoreboard.computerWinsMatch()) return this.computer;
    if (this.scoreboard.humanWinsMatch()) return this.human;
    return null;
  }

  announceMatchWinner() {
    let matchWinner = this.returnMatchWinner();
    if (!matchWinner) return null;
    if (matchWinner === this.computer) {
      console.clear();
      console.log('Computer won the match!');
    } else {
      console.clear();
      console.log('You won the match!');
    }
    return 1;
  }

  findAtRiskSquare(player) {
    let marker = player.getMarker();
    for (let row of TTTGame.POSSIBLE_WINNING_ROWS) {
      let filledSquares = row.filter(key => this.board.squares[key].getMarker()
        === marker).length;
      let emptySquare = row.find(key => this.board.squares[key].getMarker()
        === Square.UNUSED_SQUARE);
      if (filledSquares === 2 && emptySquare) return emptySquare;
    }
    return null;
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  playAgain() {
    let answer = readline.question('Play again? y/n\n').toLowerCase();
    while (answer !== 'y' && answer !== 'n') {
      console.log('Invalid response. Type y or n.');
      answer = readline.question('Play again? y/n\n');
    }
    return answer === 'y';
  }

  static joinOr(arr, split1 = ', ', split2 = 'or') {
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} ${split2} ${arr[1]}`;
    let str = '';
    if (arr.length > 2) {
      arr.forEach((val, idx) => {
        if (idx === arr.length - 1) {
          str += `${split2} ${val}`;
        } else {
          str += `${val}${split1}`;
        }
      });
    }
    return str;
  }
}

let game = new TTTGame();
game.play();

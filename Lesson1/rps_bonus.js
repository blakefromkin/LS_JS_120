// IMPORT READLINE
const readline = require('readline-sync');

// CONSTANTS
const MATCH_WIN = 3;

// OBJECT FACTORIES (subtypes of player object type)
function createPlayer() {
  return {
    move: null,
    history: [],
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    ai: createComputerAI(),

    choose() {
      let randomIndex = Math.floor(Math.random() * this.ai.choices.length);
      this.move = this.ai.choices[randomIndex];
      this.history.push(this.move);
    },

    updateAI() {
      this.ai.addLoss(this.move);
      this.ai.weighChoices();
    },
  };
  return Object.assign(playerObject, computerObject);
}

// COMPUTER AI
function createComputerAI() {
  return {
    choices: ['rock', 'paper', 'scissors'],
    losses: [],

    addLoss(move) {
      this.losses.push(move);
    },

    weighChoices() {
      let rocks = this.losses.filter(val => val === 'rock').length;
      let papers = this.losses.filter(val => val === 'paper').length;
      let scissors = this.losses.filter(val => val === 'scissors').length;

      let percentR = (rocks / this.losses.length) * 100;
      let percentP = (papers / this.losses.length) * 100;
      let percentS = (scissors / this.losses.length) * 100;

      let percents = {rock: percentR, paper: percentP, scissors: percentS};
      for (let move in percents) {
        if (percents[move] > 60) {
          let moves = ['rock', 'paper', 'scissors'];
          this.choices = this.choices.concat(moves.filter(val => val !== move));
        }
      }
    }
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    winningMoves: [],
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.history.push(this.move);
    },
  };

  return Object.assign(playerObject, humanObject);
}


// ENGINE OBJECT
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.clear();
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  humanWins() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    return (humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper');
  },

  computerWins() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    return (humanMove === 'rock' && computerMove === 'paper') ||
          (humanMove === 'paper' && computerMove === 'scissors') ||
          (humanMove === 'scissors' && computerMove === 'rock');
  },

  displayGameWinner() {
    console.clear();
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (this.humanWins()) {
      if (!this.isMatchWinner()) console.log('You win!');
    } else if (this.computerWins()) {
      if (!this.isMatchWinner()) console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  incrementScore(winner) {
    this[winner].score += 1;
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  isMatchWinner() {
    return this.human.score === MATCH_WIN || this.computer.score === MATCH_WIN;
  },

  displayMatchWinner() {
    if (this.human.score === MATCH_WIN) {
      console.log('You won the match!');
    } else {
      console.log('Computer won the match!');
    }
  },

  askHistory() {
    let answers = ['y', 'yes', 'n', 'no'];
    let answer;
    while(true) {
      console.log('Would you like to see the move history? (y/n)');
      answer = readline.question();
      if (answers.includes(answer)) break;
      console.clear();
      console.log('Invalid input. Type y/yes or n/no');
    }
    return answers.slice(0, 2).includes(answer);
  },

  displayHistory() {
    let humanMoves = '|';
    this.human.history.forEach(mov => {
      humanMoves += (mov.substring(0, 3) + '|');
    });

    let compMoves = '|';
    this.computer.history.forEach(mov => {
      compMoves += (mov.substring(0, 3) + '|');
    });

    console.clear();
    console.log('Your moves:');
    console.log(humanMoves);
    console.log('Computer moves:');
    console.log(compMoves);
  },

  playAgain() {
    let answers = ['y', 'yes', 'n', 'no'];
    let answer;
    while(true) {
      console.log('Would you like to play again? (y/n)');
      answer = readline.question();
      if (answers.includes(answer)) break;
      console.clear();en
      console.log('Invalid input. Type y/yes or n/no');
    }
    return answers.slice(0, 2).includes(answer);
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();

      this.displayGameWinner();
      if (this.humanWins()) {
        this.incrementScore('human');
        this.computer.updateAI();
      }
      if (this.computerWins()) this.incrementScore('computer');

      if (this.isMatchWinner()) {
        this.displayMatchWinner();
        this.resetScore();
      }

      if (this.askHistory()) this.displayHistory();
      if (this.playAgain()) {
        console.clear();
      } else break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

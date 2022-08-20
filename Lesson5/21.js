let readline = require('readline-sync');

class Deck {
  static ROYALS = ['King', 'Queen', 'Jack'];
  static ROYAL_POINTS = 10;
  static NUMBER_OF_SUITS = 4;

  constructor() {
    this.resetDeck();
  }

  dealCard() {
    let cardKeys = Object.keys(this.cards).filter(crd => this.cards[crd] > 0);
    let randomIdx = Math.floor(Math.random() * (cardKeys.length));

    let card = cardKeys[randomIdx];
    this.removeCardFromDeck(card);
    return card;
  }

  removeCardFromDeck(card) {
    this.cards[card] -= 1;
  }

  resetDeck() {
    this.cards = {
      Jack: Deck.NUMBER_OF_SUITS,
      Queen: Deck.NUMBER_OF_SUITS,
      King: Deck.NUMBER_OF_SUITS,
      Ace: Deck.NUMBER_OF_SUITS
    };
    for (let num = 2; num <= 10; num += 1) {
      this.cards[num] = Deck.NUMBER_OF_SUITS;
    }
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.score = 0;
  }

  isBusted() {
    return this.score > 21;
  }

  autoWin() {
    return this.score === 21;
  }

  scoreHand() {
    return this.hand.reduce((sum, card) => {
      if (Number(card) >= 2 && Number(card) <= 10) return sum + Number(card);
      if (Deck.ROYALS.includes(card)) return sum + Deck.ROYAL_POINTS;
      return sum + this.scoreAce(sum);
    }, 0);
  }

  scoreAce(num) {
    return num + 11 > 21 ? 1 : 11;
  }

  updateScore() {
    this.score = this.scoreHand();
  }

  resetScore() {
    this.score = 0;
  }

  resetHand() {
    this.hand = [];
  }

  getScore() {
    return this.score;
  }

  getHand() {
    return this.hand;
  }

  addToHand(card) {
    this.hand.push(card);
  }
}

class Player extends Participant {
  static INITIAL_BUDGET = 5;
  static IS_RICH_AT = 10;
  static IS_BROKE_AT = 0;
  static BET_PER_ROUND = 1;

  constructor() {
    super();
    this.dollars = Player.INITIAL_BUDGET;
  }

  loseDollar() {
    this.dollars -= Player.BET_PER_ROUND;
  }

  winDollar() {
    this.dollars += Player.BET_PER_ROUND;
  }

  getMoney() {
    return this.dollars;
  }

  isRich() {
    return this.dollars >= Player.IS_RICH_AT;
  }

  isBroke() {
    return this.dollars <= Player.IS_BROKE_AT;
  }
}

class TwentyOneGame {
  static DEALER_LIMIT = 17;

  constructor() {
    this.player = new Player();
    this.dealer = new Participant();
    this.deck = new Deck();
  }

  play() { // MAIN GAME LOOP
    this.displayWelcomeMessage();

    while (true) {
      this.startPlayerTurn(); // Player Turn

      if (!this.player.isBusted() && !this.player.autoWin()) { // Dealer Turn
        this.dealer.updateScore();
        console.clear();
        this.twoBlankLines();
        this.showDealerTurnCards();
        this.dealerTurn();
      }
      // End of game
      this.announceMoney();
      if (this.richOrBroke()) break;
      if (!this.playAgain()) break;
      this.prepNewGame();
    }

    this.displayGoodbyeMessage();
  }

  startPlayerTurn() {
    this.announceMoney();
    this.dealFirstCards();
    this.playerTurn();
  }

  playerTurn() {
    let firstLoop = true;
    while (true) {
      if (firstLoop === false) this.twoBlankLines();

      this.player.updateScore();
      if (this.player.isBusted()) {
        this.handlePlayerBust();
        break;
      }

      this.showPlayerTurnCards();
      if (this.player.autoWin()) {
        this.announcePlayerWin();
        break;
      }

      if (!this.wantToHit()) break;
      this.drawCard(this.player);

      console.clear();
      firstLoop = false;
    }
  }

  dealerTurn() {
    while (true) {
      if (this.dealer.isBusted()) {
        this.handleDealerBust();
        break;
      } else if (this.dealer.autoWin()
        || this.hasMorePoints() === this.dealer) {
        this.handleDealerWin();
        break;
      } else if (this.dealerMustStay()) {
        this.handleDealerStay();
        break;
      }

      this.drawCard(this.dealer);
      this.dealer.updateScore();
      this.announceDealerDraw();
    }
  }

  prepNewGame() {
    this.player.resetScore();
    this.dealer.resetScore();
    this.player.resetHand();
    this.dealer.resetHand();
    this.deck.resetDeck();
    console.clear();
    this.twoBlankLines();
  }

  handleDealerWin() {
    this.announceDealerWin();
    this.player.loseDollar();
  }

  handlePlayerWin() {
    this.announcePlayerWin();
    this.player.winDollar();
  }

  handlePlayerBust() {
    this.announcePlayerBust();
    this.player.loseDollar();
  }

  handleDealerBust() {
    this.announceDealerBust();
    this.player.winDollar();
  }

  handleDealerStay() {
    console.log('By rule, dealer stays.');
    switch (this.hasMorePoints()) {
      case this.player:
        this.handlePlayerWin();
        break;
      case this.dealer:
        this.handleDealerWin();
        break;
      case null:
        console.log("It's a tie!");
    }
  }

  playAgain() {
    console.log('');
    console.log('Play again? y/n');
    let answer = readline.question().toLowerCase();
    while (!'yn'.includes(answer)) {
      console.log("Invalid response. Type 'y' or 'n'.");
      answer = readline.question().toLowerCase();
    }
    return answer === 'y';
  }

  dealFirstCards() {
    this.drawCard(this.player);
    this.drawCard(this.player);
    this.drawCard(this.dealer);
    this.drawCard(this.dealer);
  }

  drawCard(receiver) {
    if (receiver === this.player) this.player.addToHand(this.deck.dealCard());
    if (receiver === this.dealer) this.dealer.addToHand(this.deck.dealCard());
  }

  needsN(cardVal) {
    return (cardVal === '8' || cardVal === 'Ace') ? 'n' : '';
  }

  showPlayerTurnCards() {
    let dealerCard = this.dealer.getHand()[0];
    console.log(`The dealer's first card is a${this.needsN(dealerCard)} ${dealerCard}.`);
    console.log(`Your cards are ${TwentyOneGame.joinAnd(this.player.getHand())} and your score is ${this.player.getScore()}.`);
  }

  showDealerTurnCards() {
    console.log(`The dealer's cards are ${TwentyOneGame.joinAnd(this.dealer.getHand())} and their score is ${this.dealer.getScore()}.`);
  }

  static joinAnd(arr, split1 = ', ', split2 = 'and') {
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

  wantToHit() {
    let acceptable = ['h', 'hit', 's', 'stay'];
    console.log('Hit or stay?');
    let answer = readline.question();
    while (!acceptable.includes(answer.toLowerCase())) {
      console.log('Invalid response. Type "hit" or "stay".');
      answer = readline.question();
    }
    return acceptable.slice(0, 2).includes(answer);
  }

  dealerMustStay() {
    return this.dealer.getScore() >= TwentyOneGame.DEALER_LIMIT;
  }

  hasMorePoints() {
    if (this.player.getScore() > this.dealer.getScore()) return this.player;
    if (this.dealer.getScore() > this.player.getScore()) return this.dealer;
    return null;
  }

  announcePlayerBust() {
    let hand = this.player.getHand();
    let last = hand[hand.length - 1];
    console.log(`You drew a${this.needsN(last)} ${last} and your score is ${this.player.getScore()}. You busted!`);
  }

  announceDealerBust() {
    console.log('Dealer busted!');
  }

  announceDealerDraw() {
    let last = this.dealer.getHand()[this.dealer.getHand().length - 1];
    console.log(`The dealer drew a${this.needsN(last)} ${last} and their score is now ${this.dealer.getScore()}.`);
  }

  announcePlayerWin() {
    console.log('You win!');
  }

  announceDealerWin() {
    console.log('Dealer wins!');
  }

  twoBlankLines() {
    console.log('');
    console.log('');
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to 21!');
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing 21. Goodbye!');
  }

  announceMoney() {
    console.log(`You have $${this.player.getMoney()}.`);
  }

  richOrBroke() {
    if (this.player.getMoney() === Player.IS_BROKE_AT) {
      console.log("You're broke. Maybe find a new hobby...");
      return true;
    } else if (this.player.getMoney() === Player.IS_RICH_AT) {
      console.log("You're rich! Gambling works after all!");
      return true;
    }
    return false;
  }
}

let game = new TwentyOneGame();
game.play();

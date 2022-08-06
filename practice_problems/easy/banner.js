// Behold this incomplete class for constructing boxed banners.
// Further Exploration: Modify this class so that constructor will optionally let you specify a fixed banner width at the time the Banner object is created. The message in the banner should be centered within the banner of that width.
class Banner {
  constructor(message, width) {
    this.message = message;
    this.width = width || message.length + 4;
    // Handle invalid width
    if (this.width < message.length + 4) {
      this.width = message.length + 4;
      console.log('Invalid width provided. Width reset to default value.');
    }
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
    // Note the join("\n") syntax as an interesting tool
  }

  horizontalRule() {
    return '+' + '-'.repeat(this.width - 2) + '+';
  }

  emptyLine() {
    return '|' + ' '.repeat(this.width - 2) + '|';
  }

  messageLine() {
    let padding = ((this.width - this.message.length) / 2) - 1;
    if (this.width % 2 === this.message.length % 2) {
      return '|' + ' '.repeat(padding) + this.message + ' '.repeat(padding) + '|';
    } else {
      return '|' + ' '.repeat(padding) + this.message + ' '.repeat(padding) + ' |';
    }

  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+

// For further exploration:
let banner3 = new Banner('To boldly go where no one has gone before.', 15);
banner3.displayBanner();

let banner4 = new Banner('Odd length.', 30);
banner4.displayBanner();

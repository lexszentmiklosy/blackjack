(app = function() {

  $hit = $("#hit");
  $stand = $("#stand");
  $bankroll = $("#bankroll");
  $player = $("#player");
  $dealer = $("#dealer");
  $startOver = $("#startOver");
  $dealerPrevious = $("#dealerPrevious");
  $playerPrevious = $("#playerPrevious");
  $result = $("#result");

  console.log('blah');


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function CardPlayer() {
    this.cards = []
    this.total = function() {
      let total = 0;
      let values = _.map(this.cards, (card) => {
        return card.value
      });

      // count aces at the end
      aces = _.filter(values, (value) => {
        return value === "A";
      });

      notaces = _.filter(values, (value) => {
        return value !== "A";
      });

      values = notaces.concat( aces );

      _.each (values, (value) => {
        if (value === "A") {
          if (total + 11 > 21) {
            total += 1;
          } else {
            total += 11;
          }

        } else {
          total += value;
        }
      });

      return total;
    }
    this.printCards = function() {


      let cards = _.map(this.cards, (card) => {
        return "<img src='images/" + card.imgpath + ".png' />";
      });


      return cards.join(' ');

    }
    this.bankroll = 100;
  }

  function hit() {
    player.cards.push(deck.shift());

    if (player.total() > 21) {
      playerBust()
    } else {
      render();
    }
  }

  function double() {
    if (doubleDisabled) {
      return;
    }

    player.cards.push(deck.shift());
    bet = bet * 2;
    hitDisabled = true;
    doubleDisabled = true;

    if (player.total() > 21) {
      playerBust()
    } else {
      stand();
    }
  }

  function playerBust() {
    hitDisabled = true;
    standDisabled = true;
    status = 'BUST';
    $dealerPrevious.html($dealer.html());
    $playerPrevious.html($player.html());
    $result.html(status);
    render();
  }

  function stand() {
    if (standDisabled) {
      return;
    }

    while (dealer.total() < 17) {
      dealDealer()
    }
    if (dealer.total() > 21) {
      status = 'DEALER BUST';
      player.bankroll += bet * 2;
    }
    else if (dealer.total() == player.total()) {
      status = 'PUSH';
      player.bankroll += bet;
    }
    else if (dealer.total() < player.total()) {
      status = 'PLAYER WINS';
      player.bankroll += bet*2;
    }
    else if (dealer.total() > player.total()) {
      status = 'DEALER WINS';
    }
    startOverDisabled = false;
    hitDisabled = true;
    standDisabled = true;

    $dealerPrevious.html($dealer.html());
    $playerPrevious.html($player.html());
    $result.html(status);

    render();
  }

  function dealDealer() {
    dealer.cards.push(deck.shift());

    render()
  }

  function render() {
    $dealer.html('<h1>Dealer: ' + dealer.printCards());
    $player.html('<h1>Player: ' + player.printCards());

    $bankroll.html(player.bankroll);
    $hit.disabled = hitDisabled;
    $stand.disabled = standDisabled;
    $startOver.disabled = startOverDisabled;
  }

  function startOver() {
    deck = [
      { text: "2H", imgpath: "2_of_hearts", value: 2  }, { text: "3H", imgpath: "3_of_hearts", value: 3  }, { text: "4H", imgpath: "4_of_hearts", value: 4  }, { text: "5H", imgpath: "5_of_hearts", value: 5  }, { text: "6H", imgpath: "6_of_hearts", value: 6  }, { text: "7H", imgpath: "7_of_hearts", value: 7  },
      { text: "8H", imgpath: "8_of_hearts", value: 8  }, { text: "9H", imgpath: "9_of_hearts", value: 9  }, { text: "TH", imgpath: "10_of_hearts", value: 10  }, { text: "JH", imgpath: "jack_of_hearts", value: 10 }, { text: "QH", imgpath: "queen_of_hearts", value: 10  }, { text: "KH", imgpath: "king_of_hearts", value: 10  }, { text: "AH", imgpath: "ace_of_hearts", value: "A" },
      { text: "2C", imgpath: "2_of_clubs", value: 2  }, { text: "3C", imgpath: "3_of_clubs", value: 3  }, { text: "4C", imgpath: "4_of_clubs", value: 4  }, { text: "5C", imgpath: "5_of_clubs", value: 5  }, { text: "6C", imgpath: "6_of_clubs", value: 6  }, { text: "7C", imgpath: "7_of_clubs", value: 7  },
      { text: "8C", imgpath: "8_of_clubs", value: 8  }, { text: "9C", imgpath: "9_of_clubs", value: 9  }, { text: "TC", imgpath: "10_of_clubs", value: 10  }, { text: "JC", imgpath: "jack_of_clubs", value: 10 }, { text: "QC", imgpath: "queen_of_clubs", value: 10  }, { text: "KC", imgpath: "king_of_clubs", value: 10  }, { text: "AC", imgpath: "ace_of_clubs", value: "A" },
      { text: "2D", imgpath: "2_of_diamonds", value: 2  }, { text: "3D", imgpath: "3_of_diamonds", value: 3  }, { text: "4D", imgpath: "4_of_diamonds", value: 4  }, { text: "5D", imgpath: "5_of_diamonds", value: 5  }, { text: "6D", imgpath: "6_of_diamonds", value: 6  }, { text: "7D", imgpath: "7_of_diamonds", value: 7  },
      { text: "8D", imgpath: "8_of_diamonds", value: 8  }, { text: "9D", imgpath: "9_of_diamonds", value: 9  }, { text: "TD", imgpath: "10_of_diamonds", value: 10  }, { text: "JD", imgpath: "jack_of_diamonds", value: 10 }, { text: "QD", imgpath: "queen_of_diamonds", value: 10  }, { text: "KD", imgpath: "king_of_diamonds", value: 10  }, { text: "AD", imgpath: "ace_of_diamonds", value: "A" },
      { text: "2S", imgpath: "2_of_spades", value: 2  }, { text: "3S", imgpath: "3_of_spades", value: 3  }, { text: "4S", imgpath: "4_of_spades", value: 4  }, { text: "5S", imgpath: "5_of_spades", value: 5  }, { text: "6S", imgpath: "6_of_spades", value: 6  }, { text: "7S", imgpath: "7_of_spades", value: 7  },
      { text: "8S", imgpath: "8_of_spades", value: 8  }, { text: "9S", imgpath: "9_of_spades", value: 9  }, { text: "TS", imgpath: "10_of_spades", value: 10  }, { text: "JS", imgpath: "jack_of_spades", value: 10 }, { text: "QS", imgpath: "queen_of_spades", value: 10  }, { text: "KH", imgpath: "king_of_hearts", value: 10  }, { text: "AH", imgpath: "ace_of_hearts", value: "A" }
    ]
    shuffle(deck);
    bet = 10;
    player.cards = [];
    dealer.cards = [];
    hitDisabled = false
    standDisabled = false
    doubleDisabled = false;
    startOverDisabled = true
    status = " ";
    player.bankroll -= bet;
    hit();
    hit();
    dealDealer();
  }

  $hit.on('click', hit)
  $stand.on('click', stand)
  $startOver.on('click', startOver)

  document.body.addEventListener('keydown', function (e) {
    if (e.code == "KeyA") {
      hit();
    }
    if (e.code == "KeyS") {
      stand();
    }
    if (e.code == "KeyZ") {
      double();
    }
    if (e.code == "KeyD") {
      startOver();
    }

  });

  let player = new CardPlayer();
  let dealer = new CardPlayer();
  hitDisabled = false;
  standDisabled = false;
  doubleDisabled = false;
  startOverDisabled = true;


  startOver();

})();


// TODO: split
// TODO: double
// auto start over
// strategy chart

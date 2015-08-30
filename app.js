var express = require('express'),
    jade = require('jade'),
    GoogleSpreadsheet = require('google-spreadsheet'),
    bingoSheet = new GoogleSpreadsheet('1e0JGD4NZWW2jUcDdaWEVSrWLhUCkvcI_7L9owQL3pDw'),
    app = express();

app.use(express.static('public'));

app.set('title', 'Captricity Bingo');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  bingoSheet.getInfo(function(err, data) {
    console.log(data);
    res.render('index', {
      author: data.author.email,
      title: data.title
    });
  });
});

app.get('/boards', function(req, res) {
  var numBoards = req.query.numBoards,
      bingoOptions = [];

  if (!numBoards || isNaN(parseInt(numBoards, 10))) {
    console.log('Cannot determine number of boards');
    res.redirect('/');
  }

  bingoSheet.getRows(1, function(err, data) {
    data.forEach(function(row) {
      bingoOptions.push(row.title);
    });

    var bingoBoards = [];

    for (var i = 0; i < parseInt(numBoards, 10); i++) {
      bingoBoards.push(generateBoard(bingoOptions));
    }

    res.render('bingo', {
      boards: bingoBoards
    });
  });
});

var port = process.env.PORT || 8000;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

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

function generateBoard(array) {
  array = shuffle(array);

  var bingoBoard = [];
  for (var i = 0; i < 5; i++) {
    bingoBoard[i] = array.slice(i * 5, (i * 5) + 5);
  }
  bingoBoard[2][2] = 'FREE';

  return bingoBoard;
}
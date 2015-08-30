var GoogleSpreadsheet = require('google-spreadsheet'),
    express = require('express'),
    jade = require('jade'),
    http = require('http'),
    bingoSheet = new GoogleSpreadsheet('1e0JGD4NZWW2jUcDdaWEVSrWLhUCkvcI_7L9owQL3pDw'),
    bingoOptions = [],
    app = express();

app.set('view engine', 'jade');
app.get('/', function(req, res) {
  res.render('index');
});

var server = app.listen(8000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

bingoSheet.getRows(1, function(err, row_data) {
  // row_data.forEach(function(row) {
  //   bingoOptions.push(row.title);
  // });

  // var bingoBoard = generateBoard(bingoOptions);

  // var html = jade.renderFile('index.jade');

  // http.createServer(function(request, response) {
  //   response.writeHeader(200, {'Content-Type': 'text/html'});
  //   response.write(html);
  //   response.end();
  // }).listen(8000);
  // console.log('Load localhost:8000 in your browser, bitch');
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
    bingoBoard[i] = bingoOptions.slice(i * 5, (i * 5) + 5);
  }
  bingoBoard[2][2] = 'FREE';
  console.log(bingoBoard);

  return bingoBoard;
}
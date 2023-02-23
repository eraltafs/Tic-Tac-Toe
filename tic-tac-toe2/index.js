const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the MongoDB database
MongoClient.connect("mongodb://127.0.0.1:27017/", (err, client) => {
  if (err) throw err;

  console.log('Connected to the MongoDB database');

  const db = client.db('tic-tac-toe');
  const gamesCollection = db.collection('games');

  // Handle GET requests to the home page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  // Handle POST requests to create a new game
  app.post('/games', (req, res) => {
    const game = {
      name: req.body.name,
      players: [],
      board: Array(9).fill(''),
      turn: 0,
      winner: '',
      status: 'waiting'
    };

    gamesCollection.insertOne(game, (err, result) => {
      if (err) throw err;

      res.redirect('/games/' + result.insertedId);
    });
  });

  // Handle GET requests to join a game
  app.get('/games/:id', (req, res) => {
    const id = req.params.id;

    gamesCollection.findOne({ _id: new ObjectId(id) }, (err, game) => {
      if (err) throw err;

      if (!game) {
        res.status(404).send('Game not found');
        return;
      }

      if (game.status !== 'waiting') {
        res.status(400).send('Game already in progress');
        return;
      }

      res.render('game.ejs', { game });
    });
  });

  // Start the server
  http.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

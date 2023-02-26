const express = require("express");
const app = express();
require('dotenv').config()
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const opinions = {
  debug: true,
}

app.use("/peerjs", ExpressPeerServer(server, opinions));
app.use(express.static("public"));
require('dotenv').config()
app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});


var players = {},
    unmatched;

function joinGame(socket) {

    // Add the player to our object of players
    players[socket.id] = {

        // The opponent will either be the socket that is
        // currently unmatched, or it will be null if no
        // players are unmatched
        opponent: unmatched,

        // The symbol will become 'O' if the player is unmatched
        symbol: 'X',

        // The socket that is associated with this player
        socket: socket
    };

    // Every other player is marked as 'unmatched', which means
    // there is no another player to pair them with yet. As soon
    // as the next socket joins, the unmatched player is paired with
    // the new socket and the unmatched variable is set back to null
    if (unmatched) {
        players[socket.id].symbol = 'O';
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else {
        unmatched = socket.id;
    }
}

// Returns the opponent socket
function getOpponent(socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[
        players[socket.id].opponent
    ].socket;
}



io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    setTimeout(()=>{
      socket.to(roomId).broadcast.emit("user-connected", userId);
    }, 1000)
    
  });

  joinGame(socket);
  // Once the socket has an opponent, we can begin the game
  if (getOpponent(socket)) {
      socket.emit('game.begin', {
          symbol: players[socket.id].symbol
      });
      getOpponent(socket).emit('game.begin', {
          symbol: players[getOpponent(socket).id].symbol
      });
  }

  socket.on('disconnect', function () {
      if (getOpponent(socket)) {
          getOpponent(socket).emit('opponent.left');
      }
  });

});
// console.log(process.env.PORT);
server.listen(8080);
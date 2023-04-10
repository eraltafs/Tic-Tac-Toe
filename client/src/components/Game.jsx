import React, { useState } from "react";
import Board from "./Board";
import { alertMsg } from "./alertmsg.component";
import "./alert.css"
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./chat.css";

// loading screen and checking for user joined or not
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return (
      // loading Image and text
      <div id="loding-div">
        <img alt="loading"
          id="loding-img"
          src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"
        ></img>
        <h1 id="watingText">Waiting for opponent . . .</h1>
      </div>
    );
  }
  return (
    // setting game and chat screen 
    <div className="gameContainer">
      {/* placing tic tac toe board */}
      <Board result={result} setResult={setResult} />
      {/* placing chat screen */}
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      {/* <button
        id="leavebtn"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button> */}

    
      {/* sending win message */}
      {result.state === "won" &&
        alertMsg(`${result.winner} Won The Game`,`success`)}
      {result.state === "tie" && alertMsg(` Game Tie`,`success`)}
    </div>
  );
}

export default Game;

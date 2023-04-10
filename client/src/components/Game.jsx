import React, { useState } from "react";
import Board from "./Board";
import { alertMsg } from "./alertmsg.component";
import "./alert.css"

import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./chat.css";
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
      <div id="loding-div">
        <img
          id="loding-img"
          src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"
        ></img>
        <h1 id="watingText">Waiting for opponent . . .</h1>
      </div>
    );
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
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

      {result.state === "won" &&
        alertMsg(`${result.winner} Won The Game`,`success`)}
      {result.state === "tie" && alertMsg(` Game Tie`,`success`)}
    </div>
  );
}

export default Game;

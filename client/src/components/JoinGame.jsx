import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./chatcss";
import Game from "./Game";
import { alertMsg } from "./alertmsg.component";
import "./alert.css"

// create game and chat room or channel 
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
  // checking for user is registerd or not
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alertMsg("User not Found","fail");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
    {/* checking user joined or not if joined then show game else show create room page */}
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game Room</h4>
          <input
            placeholder="username of opponent..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;

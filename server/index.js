const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { StreamChat } = require("stream-chat");
const { v4 } = require("uuid");
const app = express();
const bcrypt = require("bcrypt");
const { connection } = require("./config/db");
const { userModel } = require("./models/user.models");
require("dotenv").config();

app.use(cors());
app.use(express.json());



const serverClient = StreamChat.getInstance(process.env.api_key, process.env.api_secret);

app.post("/signup", async (req, res) => {
  
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 5);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    console.log(users)

    if (users.length === 0) {
      return res.json({ message: "user not found" });
    }

    const token = serverClient.createToken(users[0].id);

    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    console.log(error.message);
    // res.json(error);
  }
});
app.get("/:username", async(req,res)=>{
  const {username} = req.params
  res.send(await userModel.findOne({username}))
})



app.listen(3002, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running on port 3002");
});
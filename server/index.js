const express =  require("express");
const cors = require("cors");
require("dotenv").config();

const { StreamChat } = require("stream-chat");
const { v4 } = require("uuid");
const app = express();


app.use(cors());
app.use(express.json());


// creating server
const serverClient = StreamChat.getInstance(process.env.api_key, process.env.api_secret);


// signup route 
app.post("/signup", async (req, res) => {
  
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    // creating hash password
    const hashedPassword = await bcrypt.hash(password, 5);
    // genrating tokens
    const token = serverClient.createToken(userId);
    // sending details to frontend or client
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // find users
    const { users } = await serverClient.queryUsers({ name: username });

    if (users.length === 0) {
      return res.json({ message: "user not found" });
    }

    const token = serverClient.createToken(users[0].id);

    // checking password
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
    }else{
      return res.json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error.message);
    // res.json(error);
  }
});

// listening to the server


app.listen(3002, async () => {
  console.log("server is running on port 3002");
});
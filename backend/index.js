const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);



server.listen(8080,()=>{
    console.log("Server running at 8080");
})
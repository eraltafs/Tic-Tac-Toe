const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const socketio = require("socket.io");

const io =  socketio(server);
io.on("connection",(socket)=>{
    console.log("A new user joined")
    socket.on("box",(msg)=>{
        socket.emit("move",msg);
    })
});


server.listen(8080,()=>{
    console.log("Server running at http://localhost:8080");
});
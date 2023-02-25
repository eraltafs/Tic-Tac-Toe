const express = require("express");
const socketio = require("socket.io");
const app = express();
require("dotenv").config();
const http = require("http");
const http_server= http.createServer(app);
const moment = require("moment");

const io = socketio(http_server);
io.on("connection",(socket)=>{
    socket.on("msg_from_client",(msg)=>{ 
        msg.time = moment().format(`h:mm a`);
        socket.broadcast.emit("msg_from_server",msg);
        socket.emit("msg_from_server",msg);
    })









    socket.on("disconnect",(reason)=>{
        socket.broadcast.emit("user_disconnect",reason);
    });
})




http_server.listen(process.env.port,()=>{
    console.log(`Server running at http://localhost:${process.env.port}`);
})
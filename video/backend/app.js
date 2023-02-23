const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000

const app = express();

const server = http.createServer(app)
const io = require("socket.io")(server)

app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+`/public/index.html`);
})

let connectedPeers = []

io.on("connection",(socket)=>{
   connectedPeers.push(socket.id);
    console.log(connectedPeers)


    socket.on("pre-offer",(data)=>{
        console.log("pre offer came")
       const {calleePersonalCode, callType} = data;
        console.log(calleePersonalCode)

        const connectedPeer = connectedPeers.find((peerSocketId)=>
            peerSocketId===calleePersonalCode
        );

        console.log(connectedPeer)

        if(connectedPeer){
            const data = {
                callerSocketId:socket.id,
                callType,
            };
            io.to(calleePersonalCode).emit("pre-offer",data)
        }
    })


   socket.on('disconnect',()=>{
    console.log("user discoonect")

    const newConnectedPeers = connectedPeers.filter((peerSocketId)=>{
        return peerSocketId !== socket.id;
    })

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers)
   })
});



server.listen(PORT,()=>{
    console.log(`listing on PORT ${PORT}`)
})
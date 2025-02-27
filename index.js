const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Enable CORS for Express
app.use(cors());
const io = new Server(server, {
    cors: {
      origin: "*",  // Allow all origins (for testing)
      methods: ["GET", "POST"]
    }
  });

const users = {};

 io.on('connection' , socket =>{
    //when new user joined
    socket.on('new-user-joined', name =>{
        console.log("New user" , name);
        //users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});

server.listen(8000, "172.17.18.155" ,() => {
    console.log("Server running on http://172.17.18.155:8000");
  });
//sets up express, socket.io
//creates the HTTP server
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.get('/', (req, res) => {
    res.send('Welcome!');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    //Join a room
    socket.on('joinRoom', (room) => {
        console.log('${socket.id} just joined room ${room}');
        socket.join(room);
        io.to(room).emit('roomJoined', '${socket.id} just joined the room');
    });

    //leave a room
    socket.on('leaveRoom', (room) => {
        console.log('${socket.id} has left room ${room}');
        socket.leave(room);
        io.to(room).emit('roomLeft', '${socket.id} has left the room');
    });

    //post a message to a specific room
    socket.on('messageToRoom', (data) => {
        console.log('${socket.id} posted a message to room ${room}: ${data.message}');
        io.to(data.room).emit('message', {
            id: socket.id,
            message: data.message
        });
    });

    //send a message to all connected clients
    socket.on('messageToAll', (data) => {
        console.log('${socket.id} sent a message to all clients: ${data.message}');
        io.emit('message', {
            id: socket.id,
            message: data.message
        });
    });

    //disconnect event
    socket.on('disconnect', () => {
        console.log('${socket.id} disconnected');
    });
});

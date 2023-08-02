//sets up express, socket.io
//creates the HTTP server
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')('http');


io.on('connection', (socket) => {
    console.log('Connected');
    
    //emits message to ALL connected clients
    //to emit to specific client instead use socket.emit()
    socket.on('message', (data) => {
        console.log('Your Message: ', data);
        io.emit('message', data);
    });

});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});

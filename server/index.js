// const { Socket } = require('socket.io');

const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: "*"}
})

io.on('connection', (socket) => {
    console.log('connection');
    socket.on('message', (data) => {
        console.log('data server side', data)
        if(data.roomName) {
            //room stuff
            console.log('room name hit')
            socket.join(data.roomName);
            io.to(data.roomName).emit('message', {message: `${socket.id.substr(0,2)} said ${data.message}`, roomName: data.roomName});
        } else {
            io.emit('message', {message: `${socket.id.substr(0,2)} said ${data.message}`, roomName: null});
        }
    })


    // io.of("/").adapter.on("create-room", (room) => {
    //     console.log(`room ${room} was created`);
    // });
    
    // io.of("/").adapter.on("join-room", (room, id) => {
    // console.log(`socket ${id} has joined room ${room}`);
    // });


})



http.listen(8080, () => console.log('listening on port 8080'));

// const http = require('http').createServer();

// const io = require('socket.io')(http, {
//     cors: { origin: "*" }
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('message', (message) =>     {
//         console.log(message);
//         io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
//     });
// });

// http.listen(8080, () => console.log('listening on http://localhost:8080') );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 

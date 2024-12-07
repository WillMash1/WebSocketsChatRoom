
const socket = io('ws://localhost:8080');

// socket.on('message', text => {

//     const el = document.createElement('li');
//     el.innerHTML = text;
//     document.querySelector('.generalChat').appendChild(el)

// });
socket.on('message', data => {
    const el = document.createElement('li');
    el.innerHTML = data.message;
    console.log('data received', data)
    console.log('el', el)
    if(data.roomName === null) {
        document.querySelector('.generalChat').appendChild(el)
    } else {
        console.log('room name', data.roomName)
        console.log('query ', document.querySelector(`[data-roomName=${data.roomName}]`))
        console.log('query 2', document.querySelector(`[data-${data.roomName}]`))
        document.querySelector(`[data-roomName=${data.roomName}]`).appendChild(el)

    }
});



document.querySelector('.generalBtn').onclick = () => {

    const text = document.querySelector('.generalMessage').value;
    socket.emit('message', text);
    
}

let roomJoined = false;
document.querySelector('.roomSendBtn').onclick = (e) => {
    // if(!roomJoined) socket.join("some room");
    
    console.log('e', e.target.attributes[0].nodeValue);
    const roomName = e.target.attributes[0].nodeValue
    const text = document.querySelector('.roomMessage').value;
    const data = {
        roomName: roomName,
        message: text,
    }
    console.log('message', data);

    socket.emit('message', data);
}

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }
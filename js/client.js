const socket = io("http://172.17.18.155:8000");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);  
};

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value= '';
})

//Prompt for user name
const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

//Listen for user join events
socket.on('user-joined', name =>{
    append(`${name} joined the chat` ,'right')
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}` ,'right')
});
socket.on('left', name =>{
    append(`${name} left the chat` ,'left')
});

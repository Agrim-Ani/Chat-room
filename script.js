const socket = io('http://localhost:3000',{ transports: ['websocket', 'polling', 'flashsocket'] })
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')
appendMessage("you joined")
socket.emit('new-user',name)
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
    appendName(`${name} connected`)
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value
    if(message != ''){
    socket.emit('send-chat-message',message)
    }
    messageInput.value = ''
})

let appendName = (name)=>{
    const nameElement = document.createElement('div')
    nameElement.innerText = name;
    messageContainer.append(nameElement)
}

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

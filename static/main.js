// new WebSocket(`ws://${window.location.hostname}:4000`)

const { io } = require('socket.io-client')

const socket = io('ws://localhost:4000', { transport: ['websocket'] })

console.log(socket)

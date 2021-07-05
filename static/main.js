const { io } = require('socket.io-client')

const socket = io('ws://localhost:4000', { transport: ['websocket'] })

window.onload = () => {
  const sendBtnElm = document.querySelector('.btn-send')
  const messageInputElm = document.querySelector('.input-message')
  const joinRoomBtnElm = document.querySelector('.btn-join')
  const joinRoomInputElm = document.querySelector('.input-room')
  sendBtnElm.addEventListener('click', () => {
    console.log(messageInputElm.value)
  })
  joinRoomBtnElm.addEventListener('click', () => {
    console.log(joinRoomInputElm.value)
  })
}

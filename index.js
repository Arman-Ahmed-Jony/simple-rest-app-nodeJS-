require('dotenv').config() // this line adds .env power :p
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

io.on('connection', (socket) => {
  console.log('a user connected', socket)
})

if (!process.env.jwtPrivateKey) {
  console.log('FATAL: Json web token is not defined ')
  process.exit(1)
}

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(`[application] ${error}`))
db.once('open', () => console.log('[application] connected to database'))

app.use(express.json())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'static')))
app.set('view engine', 'pug')

server.listen(4000, () =>
  console.log(`[application] server created in port ${4000}... `)
)

/**
 * providing routes to the application
 */
require('./routes')(app)

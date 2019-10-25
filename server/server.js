const express = require('express')
const app = express()
var session = require('express-session')
const logger = require('./middleware/logger.js')
const cors = require('cors')
// const setHeaderJson = require('./middleware/setHeaderJson')
let whitelist = ['http://localhost:8080', 'http://192.168.1.23:8080', 'http://86.247.168.135:8080']
app.use(cors({
  credentials: true,
  origin: whitelist
  
}))
app.use(session({
  secret: 'mugiwara-ya',
  resave: false,
  saveUninitialized: true,
  name: 'mysid',
  cookie: { secure: false, maxAge: 1000*30}
}))
// middleware
app.use(express.json()) // body parser middleware
app.use(express.urlencoded({extended: false})) // form submission
//

app.use(logger)
app.use((req, res, next) => {
  res.rep = {}
  req.whichItems = {}
  next()
})
app.use('/api/items', (req, res, next) => { if (req.session.isAdmin) res.rep.adminConnected = true; next() }, require('./routes/items')) //setHeaderJson,
app.use('/api/connection', require('./routes/connection'))
// routes

//
app.listen(5000, ()=>console.log(`Server started on port ${5000}`))
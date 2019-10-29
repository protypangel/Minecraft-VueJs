const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const path = require('path')
// const setHeaderJson = require('./middleware/setHeaderJson')
let whitelist = ['http://localhost:8080', 'http://192.168.1.23:8080']
app.use(cors({
  credentials: true,
  origin: whitelist

}))
app.use(express.static(path.join(__dirname, '../dist/')))
app.use(session({
  secret: 'mugiwara-ya',
  resave: false,
  saveUninitialized: true,
  name: 'mysid',
  cookie: { secure: false }
}))
// middleware
app.use(express.json()) // body parser middleware
app.use(express.urlencoded({ extended: false })) // form submission
//

app.use((req, res, next) => {
  res.rep = {}
  req.whichItems = {}
  next()
})
app.use('/api/items', (req, res, next) => { if (req.session.isAdmin) res.rep.adminConnected = true; next() }, require('./routes/items'))
app.use('/api/connection', require('./routes/connection'))
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

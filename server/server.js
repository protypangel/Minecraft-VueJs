const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

/* */
app.use(session({
  secret: 'piedpaper',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // We arent in https but in http
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

const users = [
  {
    username: 'protypangel',
    password: 'protypangel'
  },
  {
    username: '',
    password: ''
  }
]

app.post('/api/login', (req, res) => {
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password) // Find someone who have this username
  if (!user) {
    /* No one correspond to this user */
    res.json({
      message: `Vous êtes incconu au bataillon d'exploration`,
      connect: false
    })
  } else {
    /* Connect him */
    res.json({
      message: `Bienvenue`,
      connect: true
    })
    /* */
  }
})

app.get('/api/logout', (req, res) => {
  console.log('logout teste', req.session.username)
  if (!req.session.username) { // If the personne isnt connect
    res.status(401)
    res.json({
      message: 'you are already disconnected'
    })
  } else { // If he is connect
    req.session.userId = 0
    res.json({
      message: 'you are now disconnected'
    })
  }
})
/* Set the port and initialize it */
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
/* */

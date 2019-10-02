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

const users = [{
  username: 'protypangel',
  password: 'protypangel'
}]

app.get('/api/test', (req, res) => {
  res.json([
    {
      title: 'truc',
      content: 'machin'
    }, {
      title: 'truc2',
      content: 'machin2'
    }
  ])
})

app.post('/api/login', (req, res) => {
  if (!req.session.connect) { // If the personne isnt connect
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password) // Find someone who have this username
    if (!user) { // No one exist with that login
      res.json({ message: `Vous êtes incconu au bataillon d'exploration` })
    } else {
      /* Connect him */
      req.session.connect = true
      res.json({ message: 'connected' })
      /* */
    }
  } else {
    res.status(401)
    res.json({ message: 'you are already connected' })
  }
})
/* Set if the personne go into /api/logout with get to log out */
app.get('/api/logout', (req, res) => {
  if (!req.session.userId) { // If the personne isnt connect
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
/* Set if the personne go into /api/admin with get */
app.get('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) { // If the personne isnt connect
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  res.json({ // If He's connected
    message: 'congrats, you are connected'
  })
})
/* Set the port and initialize it */
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
/* */

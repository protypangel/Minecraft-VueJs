const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

/* */
app.use(session({
  secret: 'blablabla',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // We arent in https but in http
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const users = [{
  username: 'admin',
  password: 'changethispassword'
}]

app.get('/api/test', (req, res) => {
  console.log('ce console.log est appelé au bon moment')
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
  console.log('here')
  // console.log('req.body', req.body)
  // console.log('req.query', req.query)
  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
    if (!user) {
      // gérez le cas où on n'a pas trouvé d'utilisateur correspondant
      res.json({
        message: `Vous êtes incconu au bataillon d'exploration`
      })
    } else {
      // connect the user
      req.session.userId = 1000 // connect the user, and change the id
      res.json({
        message: 'connected'
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
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

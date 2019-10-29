const admins = require('../admins')
const express = require('express')
const router = express.Router()
// middlewares
let validateFields = (req, res, next) => {
  for (let field in admins[0]) {
    if (!req.body[field] && !field === 'icon') { return res.status(400).json({ error: `definir le champ ${field}` }) }
  }
  next()
}
let setIsAdmin = (req, res, next) => { // check si les user et mot de passe sont bons
  if (!req.session.userID) {
    const found = admins.some(admin => admin.name === req.body.name && admin.password === req.body.password)
    if (found) {
      req.session.isAdmin = true
      req.session.userID = admins.findIndex(admin => admin.name === req.body.name && admin.password === req.body.password) + 1
      req.session.infos = admins[admins.findIndex(admin => admin.name === req.body.name && admin.password === req.body.password)]
      next()
    } else {
      return res.status(400).json({ error: 'wrong user or password' })
    }
  } else {
    return res.status(400).json({ error: 'already logged in' })
  }
}
// ROUTES
router.post('/login', validateFields, setIsAdmin, (req, res) => {
  res.json({ msg: `you are now logged in as ${req.body.name}`, infos: req.session.infos })
})
router.post('/logout', (req, res) => {
  if (req.session.userID) {
    req.session.destroy()
    res.clearCookie('mysid')
    res.json({ msg: 'disconnected' })
  } else {
    res.status(400).json({ error: 'already disconnected' })
  }
})

module.exports = router

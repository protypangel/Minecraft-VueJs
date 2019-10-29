/* TODO QUAND ON SUPPR UN ELEMENT AU MILIEU, MAJ LES IDs  */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const itemTest = require('../items/itemTest')
let basicItems = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'items', 'basicItems.json')))
let defenseItems = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'items', 'defenseItems.json')))
let foodItems = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'items', 'foodItems.json')))
let toolItems = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'items', 'toolItems.json')))
let basicItemsCopy = JSON.parse(JSON.stringify(basicItems))
let defenseItemsCopy = JSON.parse(JSON.stringify(defenseItems))
let foodItemsCopy = JSON.parse(JSON.stringify(foodItems))
let toolItemsCopy = JSON.parse(JSON.stringify(toolItems))
// ///// MIDDLEWARES
let correctJSONParams = (req, res, next) => {
  try {
    JSON.parse(req.params.myParams)
    next()
  } catch (error) {
    res.json({ error: 'correct JSON is needed as parameter' })
  }
}
let witchItemMiddleWare = (req, res, next) => {
  // console.log('params recup', req.params.myParams)
  req.params.myParams = JSON.parse(req.params.myParams)
  // console.log('item recup in witchitem middleware: ', req.params.myParams)
  switch (req.params.myParams.whichItems) {
    case 'basicItems':
      req.whichItems = basicItemsCopy
      break
    case 'defenseItems':
      req.whichItems = defenseItemsCopy
      break
    case 'foodItems':
      req.whichItems = foodItemsCopy
      break
    case 'toolItems':
      req.whichItems = toolItemsCopy
      break
    case 'save':
      return saveChanges(req, res, next)
    case 'cancel':
      return cancelChanges(req, res, next)
    default:
      return res.status(400).json({ error: 'Page Non Trouvée' })
  }
  next()
}
let checkIsAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'you need to be connected as an admin' })
  }
  next()
}
let allFieldsDefined = (req, res, next) => {
  for (let field in itemTest) {
    if (!req.body[field] || itemTest[field]) {
      return res.status(400).json({ error: `you must define field ${field}` })
    }
  }
  next()
}
router.use('/:myParams', correctJSONParams, witchItemMiddleWare)
// FUNCTIONS
function saveChanges (req, res, next) {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'you need to be connected as an admin' })
  }
  basicItems = JSON.parse(JSON.stringify(basicItemsCopy))
  defenseItems = JSON.parse(JSON.stringify(defenseItemsCopy))
  foodItems = JSON.parse(JSON.stringify(foodItemsCopy))
  defenseItems = JSON.parse(JSON.stringify(toolItemsCopy))
  fs.writeFile(path.join(__dirname, '..', 'items', 'basicItems.json'), JSON.stringify(basicItemsCopy), err => { if (err) throw err })
  fs.writeFile(path.join(__dirname, '..', 'items', 'defenseItems.json'), JSON.stringify(defenseItemsCopy), err => { if (err) throw err })
  fs.writeFile(path.join(__dirname, '..', 'items', 'foodItems.json'), JSON.stringify(foodItemsCopy), err => { if (err) throw err })
  fs.writeFile(path.join(__dirname, '..', 'items', 'toolItems.json'), JSON.stringify(toolItemsCopy), err => { if (err) throw err })
  res.json({ msg: 'changes saved', basicItems, defenseItems, foodItems, toolItems })
}
function cancelChanges (req, res, next) {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'you need to be connected as an admin' })
  }
  basicItemsCopy = JSON.parse(JSON.stringify(basicItems))
  defenseItemsCopy = JSON.parse(JSON.stringify(defenseItems))
  foodItemsCopy = JSON.parse(JSON.stringify(foodItems))
  toolItemsCopy = JSON.parse(JSON.stringify(toolItems))
  res.json({ msg: 'changes cancelled', basicItems, defenseItems, foodItems, toolItems })
}

let safeUpdate = (old, maj) => { // Si Un Champ Non Renseigné On Garde Ancienne Valeur
  for (let field in old) {
    if (maj[field]) { old[field] = maj[field] }
  }
}
let updateIDs = (tab, start) => {
  for (let i = start; i < tab.length; i++) {
    tab[i].id--
  }
}
// /////////////////////////////////////////////////////  ROUTES /////////////////////////////////////////////////////

/// //////   POST  CREATE
router.post('/:myParams', allFieldsDefined, checkIsAdmin, (req, res) => {
  req.body.id = req.whichItems.items.length + 1
  req.body.type = req.whichItems.type
  req.body.enModif = false
  req.whichItems.items.push(req.body)
  res.json({ ...res.rep, ...req.whichItems })
})
/// //////   GET   RETRIEVE
router.get('/:myParams', (req, res) => {
  if (req.session.infos) {
    let tmp = { infos: req.session.infos }
    res.json({ ...res.rep, ...req.whichItems, ...tmp })
  } else { res.json({ ...res.rep, ...req.whichItems }) }
})
/// /////  PUT   UPDATE
router.put('/:myParams', checkIsAdmin, (req, res) => {
  let index = -1
  if ((index = req.whichItems.items.findIndex(item => item.id === parseInt(req.body.id))) !== -1) {
    safeUpdate(req.whichItems.items[index], req.body)
    res.json(req.whichItems)
  } else {
    res.status(400).json({ error: 'item not found' })
  }
})
/// //////   DELETE
router.delete('/:myParams', checkIsAdmin, (req, res) => {
  req.params.myParams = JSON.parse(req.params.myParams)
  let index = -1
  if ((index = req.whichItems.items.findIndex(item => item.id === parseInt(req.params.myParams.id))) !== -1) {
    req.whichItems.items.splice(index, 1)
    updateIDs(req.whichItems.items, index)
    res.json(req.whichItems)
  } else {
    res.status(400).json({ error: 'item not found' })
  }
})
module.exports = router

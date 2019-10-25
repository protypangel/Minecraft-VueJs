let setHeaderJson = (req, res, next) => {
  res.setHeader('Content-Type', 'text/JSON')
  next()
}
module.exports = setHeaderJson
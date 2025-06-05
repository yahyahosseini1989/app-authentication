const errorHandler = (error, req, res, next) => {
  res.status(400).send('something failed')
}
module.exports = errorHandler
require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('token')
  if (!token) return res.status(401).send('Access denied')
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    req.userData = decode
    next()
  } catch (error) {
    console.error(error);
    return res.status(400).send('token is invalid')
  }
}

module.exports = auth
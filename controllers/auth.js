require('dotenv').config()

const jwt = require('jsonwebtoken')
const _ = require('lodash')

// http://localhost:5001/post/get-all-post (GET)
const auth = async (req, res) => {
  let message = ''
  let error = ''
  let data = ''
  
  try {
    const decoded = await jwt.verify(req.query.token, process.env.JWT_SECRET_KEY)

    if (!_.isEmpty(decoded)) {
      message = 'Success'
      data = decoded
    } else {
      message = 'Failed'
    }
  } catch (err) {
    error = err
    message = 'Failed'
  }

  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

module.exports = {
  auth
}

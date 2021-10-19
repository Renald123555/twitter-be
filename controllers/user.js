require('dotenv').config()

const pg = require('../config/db')
const _ = require('lodash')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const state = require('../config/state')

// http://localhost:5001/user/register (POST)
// {
//     "name": "brilliant joan",
//     "password": "asdfg123",
//     "email": "brilliantjoan9916@gmail.com",
//     "phone": null,
//     "dob": "2020-09-12"
// }
const registerUser = (req, res) => {
  const body = req.body
  let message = ''
  let error = ''
  const data = ''

  const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const username = body.name.split(' ').join('')

  try {
    const data =
    {
      id: state.user.length + 1,
      password: body.password,
      username: username,
      email: body.email,
      name: body.name,
      phone: body.phone,
      dob: body.dob,
      created_at: currentTimestamp
    }

    state.user.push(data)

    const result = "Success"

    if (_.isEmpty(result)) {
      message = 'Failed'
      error = err
    } else {
      message = 'Success'
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

  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) return err
  //   bcrypt.hash(body.password, salt, async (err, hash) => {
  //     if (err) return err
  //     try {
  //       const sql = await pg.connect()
  //       const result = await sql.query('INSERT INTO users (username, password, email, name, phone, dob, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [username, hash, body.email, body.name, body.phone, body.dob, currentTimestamp])
  //       sql.release()

  //       if (_.isEmpty(result)) {
  //         message = 'Failed'
  //         error = err
  //       } else {
  //         message = 'Success'
  //       }
  //     } catch (err) {
  //       error = err
  //       message = 'Failed'
  //     }

  //     const returnMessage = {
  //       message: message,
  //       error: error,
  //       data: data
  //     }
  //     res.json(returnMessage)
  //   }
  //   )
  // })
}

// http://localhost:5001/post/login (POST)
// {
//     "username": "brilliantjoan",
//     "password": "asdfg123",
//     "email": null,
//     "phone": null
// }
const loginUser = async (req, res) => {
  const body = req.body
  let message = ''
  let error = ''
  let data = ''

  // const query = ''
  // const whereConstraint = ''
  // if (!_.isEmpty(body.email)) {
  //   query = 'SELECT * FROM users WHERE email = $1 LIMIT 1'
  //   whereConstraint = body.email
  // } else if (!_.isEmpty(body.phone)) {
  //   query = 'SELECT * FROM users WHERE phone = $1 LIMIT 1'
  //   whereConstraint = body.phone
  // } else {
  //   query = 'SELECT * FROM users WHERE username = $1 LIMIT 1'
  //   whereConstraint = body.username
  // }

  try {
    // const sql = await pg.connect()
    // const result = await sql.query('SELECT * FROM users WHERE email = $1 OR phone = $2 OR username = $3 LIMIT 1', [body.email, body.email, body.email])
    // const result = {rows: [{
    //   id: 1,
    //   password:"Barclona",
    //   username: "CR07",
    //   email: "CR@gmail.com",
    //   name: "Christiano ROnaldo",
    //   phone: "083726583",
    //   dob: "08-11-1999"
    // }]}
    let result = []
    state.user.forEach((data) => {
      if (body.email === data.email || body.email === data.phone || body.email === data.username) {
        result.push(data)
      }
    })
    if (!_.isEmpty(result)) {
      // const hashRes = await bcrypt.compare(body.password, result.password)
      const hashRes = (body.password === result[0].password) ? true : false
      if (hashRes) {
        const tokenData = {
          id: result[0].id,
          username: result[0].username,
          email: result[0].email,
          name: result[0].name,
          phone: result[0].phone,
          dob: result[0].dob
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY)
        message = 'Success'
        data = token
      } else {
        message = 'Failed'
        data = 'Wrong credentials'
      }
    } else {
      message = 'Failed'
      data = 'Wrong credentials'
    }
  } catch (err) {
    message = 'Failed'
    error = err
    return error
  }
  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

module.exports = {
  registerUser,
  loginUser
}

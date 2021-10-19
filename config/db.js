const { Pool } = require('pg')
require('dotenv').config()

const connection = new Pool({
  user: process.env.DBUser,
  host: process.env.DBHost,
  database: process.env.DBName,
  password: process.env.DBPassword,
  port: process.env.DBPort,
  max: 20
})

module.exports = connection

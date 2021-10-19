const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5001

const route = require('./routers/route')

app.use(cors())

app.use(express.json({ extended: false }))

app.use('/', route)

app.listen(port, () => {
  console.log(`Backend server running on PORT: ${port}`)
})

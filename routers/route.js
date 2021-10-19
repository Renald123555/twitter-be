const index = require('express').Router()

const post = require('./post')
const user = require('./user')
const auth = require('./auth')

index.use('/post', post)
index.use('/user', user)
index.use('/auth', auth)

module.exports = index

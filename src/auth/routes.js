'use strict'

const express = require('express')
const authRouter = express.Router()

const { users } = require('./models/index')
const basicAuth = require('./middleware/basic')
const bearerAuth = require('./middleware/bearer')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body)
    const output = {
      user: userRecord,
      token: userRecord.token
    }
    res.status(200).json(output)
  } catch (e) {
    next(e.message)
  }
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user.username,
    token: req.user.token
  }
  res.status(200).json(user)
})

// TODO: Implement Bearer Auth
authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await Users.findAll({})
  const list = users.map(user => user.username)
  res.status(200).json(list)
})

// TODO: Implement Bearer Auth
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area!')
})

module.exports = authRouter

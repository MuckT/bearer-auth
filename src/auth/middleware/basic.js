'use strict'

const base64 = require('base-64')
const { users } = require('../models/index')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError() }

  let basic = req.headers.authorization.split(' ')[1]
  console.log(basic)
  let decodedString = base64.decode(basic)
  console.log(decodedString)
  let [username, pass] = decodedString.split(':')

  try {
    req.user = await users.authenticateBasic(username, pass)
    next()
  } catch (e) {
    res.status(403).send('Invalid Login')
  }
}

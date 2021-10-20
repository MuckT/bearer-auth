'use strict'

const base64 = require('base-64')

const basic = (users) => async(req, res, next) => {
  if (!req.headers.authorization) { throw new Error('Auth Error') }
  let basic = req.headers.authorization.split(' ')[1]
  let decodedString = base64.decode(basic)
  let [username, pass] = decodedString.split(':')

  try {
    req.user = await users.authenticateBasic(username, pass)
  } catch (e) {
    res.status(403).send('Invalid Login')
  } finally {
    next()
  }
}

module.exports = basic

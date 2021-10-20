'use strict'

const bearer = (users) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login') }
    
    const token = req.headers.authorization.split(' ').pop()

    const validUser = await users.authenticateToken(token)

    req.user = validUser
    req.token = validUser.token

  } catch (e) {
    res.status(403).send('Invalid Login')
  } finally {
    next()
  }
}

module.exports = bearer

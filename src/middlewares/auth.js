const verifyJwt  = require('../utils/jwt').verifyJwt
const jwt = require('express-jwt')
const secret = '2h4vk24h5k2h34jvh3b4j13h4k13hvk2135'

async function userAuthViaToken(req, res, next) {
  const auth = req.header('Authorization')
  if (!auth) {
    return res.status(403).send({
      errors: {
        body: [
          'Only for logged in users'
        ]
      }
    })
  }

  if (!auth.startsWith('Token')) {
    return res.status(400).send({
      errors: {
        body: [
          'Authorization format not supported'
        ]
      }
    })
  }

  const token = auth.substr(6)
  try {
    const user = await verifyJwt(token)
    req.user = user
    return next()
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [
          'JWT verification failed'
        ]
      }
    })
  }

}

function getTokenFromHeader(req){
  const auth = req.header('Authorization')
  if (!auth || !auth.startsWith('Token')) {
      return null
  }

  const token = auth.substr(6)
  return token
}

var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = {
  userAuthViaToken,
  auth
}
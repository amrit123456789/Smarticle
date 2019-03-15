const  Users  = require('../models').Users
const  createJwt  = require('../utils/jwt').createJwt

async function verifyUser(userOpts) {
  if (!userOpts.email) {
    throw new Error('Did not supply email')
  }
  if (!userOpts.password) {
    throw new Error('Did not supply password')
  }

  const user = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image', 'password'],
    where: {
      email: userOpts.email,
    }
  })

  if (!user) {
    throw new Error('No user with given email address')
  }

  if (user.password !== userOpts.password) {
    throw new Error('Password does not match')
  }
  const token = await createJwt(user.get())
  const userJson = {
    ...user.get(),
    token
  }
  delete userJson.password
  return userJson
}

module.exports = {
 
  verifyUser
}
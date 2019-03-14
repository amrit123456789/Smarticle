const { Router } = require('express')
const { createUser, verifyUser } = require('../../controllers/users')

const route = Router()

route.post('/', async (req, res) => {
  console.log("here in users api before")
  console.log(req.body)
  const createdUser = await createUser( req.body)
  console.log("here in users api after")
  res.send(createdUser)
})

route.post('/login', async (req, res) => {
  try {
    const verifiedUser = await verifyUser(req.body)
    res.send(verifiedUser)
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    })
  }
})


module.exports = route
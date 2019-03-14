const { Router } = require('express')
const { createUser, verifyUser } = require('../../controllers/users')

const route = Router()

route.post('/', function(req,res,next){
  var user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

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
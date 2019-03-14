const { Router } = require('express')
const { userAuthViaToken } = require('../../middlewares/auth')
const {Users} = require('../../models/index')

const route = Router()

route.get('/', userAuthViaToken, (req, res) => {
  if (req.user) {
    res.send(req.user)
  }
})

route.put('/' , userAuthViaToken, async (req,res)=>{
  const user = await Users.findOne({
    where:{email : req.body.email,}
  })

    if (!user) {
      return res.sendStatus(401);
    }

    if(typeof req.body.email !== undefined){
        user.email=req.body.email
    }
    if(typeof req.body.username !== undefined){
      user.username=req.body.username
    }
    if(typeof req.body.bio !== undefined){
      user.bio=req.body.bio
    }
    if(typeof req.body.image !== undefined){
      user.image=req.body.image
    }
    if(typeof req.body.password !== undefined){
      user.password=req.body.password
    }
    console.log("before update")

    Users.update(
      {email:user.email,username:user.username,bio:user.bio,image:user.image,password:user.password},
     // {fields:['email','username','bio','image','password']},
      { where:{email:req.body.email}}
    ).then(
       res.send(user)
    ).catch((err) => {
      res.status(500).send({
        errors: {
          body: [ err.message ]
        }
      })
    })
    //res.send("foo")
})

module.exports = route
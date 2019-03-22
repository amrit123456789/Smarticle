const { Router } = require('express')
var auth = require('../../middlewares/auth')
var mongoose = require('mongoose');
//var passport = require('passport');
var User = mongoose.model('User');

const route = Router()

route.get('/', auth.required, function(req,res,next){
  User.findById(req.payload.id).then(function(user){
      if(!user){return res.sendStatus(401)}

      return res.json({user: user.toAuthJSON()})
  }).catch(next);
})

route.put('/' , auth.required, function(req,res,next){
    console.log("here in bakend//////")
  User.findById(req.payload.id).then(function(user){
      if(!user){return res.sendStatus(401);}

      if(typeof req.body.username !== 'undefined'){
          console.log("req.body.username", req.body.username)
          user.username = req.body.username;
      }
      if(typeof req.body.email !== 'undefined'){
          user.email = req.body.email;
      }
      if(typeof req.body.bio !== 'undefined'){
          user.bio = req.body.bio;
      }
      if(typeof req.body.image !== 'undefined'){
          user.image = req.body.image;
      }
      if(typeof req.body.password !== 'undefined'){
          user.setPassword(req.body.password);
      }

      return user.save().then(function(){
          console.log("user is ",user)
         return res.json({user: user.toAuthJSON()});
      });
  }).catch(next);
});

module.exports = route
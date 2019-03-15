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
  User.findById(req.payload.id).then(function(user){
      if(!user){return res.sendStatus(401);}

      if(typeof req.body.user.username !== 'undefined'){
          user.username = req.body.user.username;
      }
      if(typeof req.body.user.email !== 'undefined'){
          user.email = req.body.user.email;
      }
      if(typeof req.body.user.bio !== 'undefined'){
          user.bio = req.body.user.bio;
      }
      if(typeof req.body.user.image !== 'undefined'){
          user.image = req.body.user.image;
      }
      if(typeof req.body.user.password !== 'undefined'){
          user.setPassword(req.body.user.password);
      }

      return user.save().then(function(){
          return res.json({user: user.toAuthJSON()});
      });
  }).catch(next);
});

module.exports = route
const Router =require('express').Router
var mongoose = require('mongoose');
var User = mongoose.model('User');
const route =Router()
var auth =require('../../middlewares/auth')


// Preload user profile on routes with ':username'
route.param('username', function(req, res, next, username){
  console.log("in param")
  User.findOne({username: username}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

route.get('/:username',auth.optional, function(req, res, next){
  console.log("in get")
  if(req.payload){
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});
module.exports=route
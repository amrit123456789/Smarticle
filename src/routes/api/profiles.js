const Router =require('express').Router
const {Users} =require('../../models/index')
const route =Router()
const {auth}=require('../../middlewares/auth')


// Preload user profile on routes with ':username'
route.param('username', function(req, res, next, username){
  Users.findOne({
    where:{username: username}
  }).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

route.get('/:username',auth.optional, function(req, res, next){
  if(req.payload){
    Users.findById(req.payload.id).then(function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});
module.exports=route
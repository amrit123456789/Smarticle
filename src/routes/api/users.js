const { Router } = require('express')
//const {  verifyUser } = require('../../controllers/users')
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

const route = Router()



route.post('/login',function(req,res,next){

  console.log(req.body)
  if(!req.body.email){
      return res.status(422).json({errors: {email: "can't be blank."}});
  }

  if(!req.body.password){
      return res.status(422).json({errors: {password: "can't be blank."}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){return next(err);}

      if(user){
          user.token = user.generateJWT();
          console.log(user.token)
          return res.json({user: user.toAuthJSON()});
          //successRedirect: '/',
          //failureRedirect: '/api/auth/login'
          res.redirect('../../pages/index.html')
      } else {
          return res.status(422).json(info);
      }
  })(req,res,next)
});



route.post('/', function(req,res,next){
  var user = new User();
  
   console.log("req.body: ",req.body)
//   console.log("req.body.user: ",req.body.user)
 // console.log(JSON.parse((req.body)))
 
  user.email = req.body.email;
  user.username = req.body.username;
  user.setPassword(req.body.password);
  console.log("after changing")
  console.log(user)
  try{
  user.save().then(function(){
    console.log("after changing")
      return res.json({user: user.toAuthJSON()});
  }).catch(err=>{
    console.log(err);
  });
}
catch(err){
    console.log(err);
}
});

route.use(function(err,req,res,next){

  if(err.name === 'ValidationError'){

      return res.json({

          errors: Object.keys(err.errors).reduce(function(errors ,key){

              errors[key] = err.errors[key].message;

              return errors;

          }, {})

      })

  }

  return next(err);

});

module.exports = route
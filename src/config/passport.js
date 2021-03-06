var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done){
    User.findOne({email: username}).then(function(user){
        if(!user || !user.validPassword(password)){
            return done(null, false, {errors: {"email or password":"is invalid."}})
        }
        return done(null, user);
    }).catch(done);
}));
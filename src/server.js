var http = require('http'),
    path = require('path'),
    //methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    //session = require('express-session'),
    //cors = require('cors'),
    passport = require('passport'),
   // errorhandler = require('errorhandler'),
mongoose = require('mongoose');

const app =express()

require('./models/user')
require('./models/comment')
require('./models/article')

require('./config/passport')


var db = 'mongodb://localhost:27017/my_db';
mongoose
.connect(db,{useNewUrlParser:true})
.then(()=>console.log("mongo server connected succesfully"))
.catch(err=>console.log(err))

// For POST requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./public/pages'))

app.use('/', (req,res,next)=>{
//  if(req.user){
      
      return express.static(path.join(__dirname, 'public/pages/index.html'))(req,res,next)
      //next()
  //}
  // else{
  //     res.redirect('/api/auth/login')
  //     next()
  // }
  
})

dwwsofmwsomfsm
// Routes
app.use('/api', require('./routes/api'))


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err) ;
});

var server = app.listen( process.env.PORT || 7788, function(){
  console.log('Listening on port  http://localhost:' + server.address().port);
});
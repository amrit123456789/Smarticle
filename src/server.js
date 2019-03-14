const express = require('express')
const db =require('./models').db
const app =express()

// For POST requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', require('./routes/api'))


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err) ;
});

var server = app.listen( process.env.PORT || 7788, function(){
  console.log('Listening on port ' + server.address().port);
});
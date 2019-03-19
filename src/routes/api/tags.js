const Router =require('express').Router

const route =Router()
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

route.get('/', function(req,res,next){
    Article.find().distinct('tagList').then(function(tags){
        return res.json({tags: tags});
    }).catch(next);
});

module.exports=route
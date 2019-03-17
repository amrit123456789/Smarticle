const Router =require('express').Router
const route =Router()
var mongoose =require('mongoose')
var Article = mongoose.model('Article')
var User = mongoose.model('User')
var auth =require('../../../middlewares/auth')

route.use('/comments' , require('./comments'))

route.post('/', auth.required , (req,res,next)=>{
  User.findById(req.payload.id).then((user)=>{
    if(!user)return res.sendStatus(401)

    var article = new Article(req.body.article)
    article.author= user
    console.log("before saving in db")
    return article.save().then(()=>{
      console.log("after saving in db")
      return res.json({article:article.toJSONFor(user)})
    })
  })
  .catch(next)
})

route.param('article', (req,res,next,slug)=>{
  console.log("iam in article param")
  Article.findOne({slug:slug})
  .populate('author')
  .then((article)=>{
        if(!article){
          return res.sendStatus(404)
        }
        req.article=article
        console.log("article is ",article)
        return next()
  })
  .catch(next)
})


// Get one article.. understand it once again
route.get('/:article', auth.optional, function(req,res,next){
  Promise.all([
   // console.log("req.payload before......",req.payload)
      req.payload ? User.findById(req.payload.id) : null,
      req.article.populate('author').execPopulate()
      //console.log("req.payload after......",req.payload)
  ]).then(function(results){
    console.log("results............" , results)
      var user = results[0];
      console.log("user is.....", user)
      return res.json({article: req.article.toJSONFor()});
  }).catch(next);
});

route.put(':/article',auth.required, (req,res,next)=>{
  User.findById(req.payload.id).then((user)=>{
    if(req.article.author._id.toString()=== req.payload.id.toString()){

      if( typeof req.body.article.title !== 'undefined'){
        req.article.title =req.body.article.title
      }
      if( typeof req.body.article.body !== 'undefined'){
        req.article.body =req.body.article.body
      }
      if( typeof req.body.article.description !== 'undefined'){
        req.article.description =req.body.article.description
      }
      
      return req.article.save().then(()=>{
        return res.json( {article : req.article.toJSONFor(user)})
      })

    }
    else{
        return res.sendStatus(403)
    }
  

}).catch(next)
})

  route.delete('/:article', auth.required , (req,res,next)=>{
    User.findById(req.payload.id).then((user)=>{
      if(req.payload.id.toString()=== req.author._id.toString()){
            req.article.remove().then(()=>{
              return res.sendStatus(204)
            })
      }
      else{
           res.sendStatus(403)
      }
    })
    .catch(next)
  })

  
  // // Get single article
  // route.get('/:slug', (req, res) => {
  //   res.send({
  //     "article": {
  //       "slug": req.params.slug,
  //       "title": "How to train your dragon",
  //       "description": "Ever wonder how?",
  //       "body": "It takes a Jacobian",
  //       "tagList": ["dragons", "training"],
  //       "createdAt": "2016-02-18T03:22:56.637Z",
  //       "updatedAt": "2016-02-18T03:48:35.824Z",
  //       "favorited": false,
  //       "favoritesCount": 0,
  //       "author": {
  //         "username": "jake",
  //         "bio": "I work at statefarm",
  //         "image": "https://i.stack.imgur.com/xHWG8.jpg",
  //         "following": false
  //       }
  //     }
  //   })
  // })
  
  // // Get comments on an article
  // route.get('/:slug/comments', (req, res) => {
  //   res.send({
  //     "comments": [{
  //       "id": 1,
  //       "createdAt": "2016-02-18T03:22:56.637Z",
  //       "updatedAt": "2016-02-18T03:22:56.637Z",
  //       "body": "It takes a Jacobian",
  //       "author": {
  //         "username": "jake",
  //         "bio": "I work at statefarm",
  //         "image": "https://i.stack.imgur.com/xHWG8.jpg",
  //         "following": false
  //       }
  //     }, {
  //       "id": 2,
  //       "createdAt": "2016-03-18T03:22:56.637Z",
  //       "updatedAt": "2016-03-18T03:22:56.637Z",
  //       "body": "It makes a Jacobian",
  //       "author": {
  //         "username": "mary",
  //         "bio": "I work at farmstate",
  //         "image": "https://i.stack.imgur.com/xHWG8.jpg",
  //         "following": false
  //       }
  //     }]
  //   })
  // })

module.exports=route
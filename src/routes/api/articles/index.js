const Router =require('express').Router
const route =Router()
var mongoose =require('mongoose')
var Article = mongoose.model('Article')
var User = mongoose.model('User')
var Comment =mongoose.model('Comment')
var auth =require('../../../middlewares/auth')

//route.use('/comments' , require('./comments'))

route.param('article', (req,res,next,slug)=>{
  console.log("iam in article param")
  Article.findOne({slug:slug})
  .populate('author')
  .then((article)=>{
        if(!article){
          return res.sendStatus(404)
        }
       // console.log("req.article is .............",req.article)
        req.article=article
      //  console.log("article is .........",article)
        return next()
  })
  .catch(next)
})

route.param('comment', (req,res,next,id)=>{
  console.log("in param req")
  Comment.findById(id).then(function(comment){
    if(!comment){return res.sendStatus(404);}

    req.comment = comment;
     next()
  })
  .catch(next)
})

route.get('/feed', auth.required, function(req,res,next){

  //console.log("Here",req.user)
  var limit = 20;
 // var query = {};
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
      limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
      offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
      if(!user){return res.sendStatus(401);}

      Promise.all([
          Article.find({author: {$in: user.following}})
              .limit(Number(limit))
              .skip(Number(offset))
              .populate('author')
              .exec(),
          Article.count({author: {$in: user.following}})
      ]).then(function(results){
          var articles = results[0];
          var articleCount = results[1];

          return res.json({
              articles: articles.map(function(article){
                  return article.toJSONFor(user);
              }),
              articleCount: articleCount
          });
      });
  }).catch(next);
});

route.post('/', auth.required , (req,res,next)=>{
  console.log("in backend post.......")
  //res.redirect('../../../pages/auth.html')
  User.findById(req.payload.id).then((user)=>{
    if(!user)return res.sendStatus(401)
    // console.log("req.body is  ", req.body)
    // console.log("req.body.title ", req.body.title)

    var article = new Article()
    article.title=req.body.title
    article.body=req.body.body
    article.tagList=req.body.tagList
    
    article.author= user
    console.log(article)
    console.log("before saving in db")
    return article.save().then(()=>{
      console.log("after saving in db")
      return res.json({article:article.toJSONFor(user)})
     
     })
   })
   //see how to do this res.redirect('../../../pages/index.html?token='+user.token)
  // .catch(next)
})




// Get one article.. understand it once again
route.get('/:article', auth.optional, function(req,res,next){
  console.log("req.payload before......",req.payload)
  Promise.all([
   // console.log("req.payload before......",req.payload)
      req.payload ? User.findById(req.payload.id) : null,
      req.article.populate('author').execPopulate()
      //console.log("req.payload after......",req.payload)
  ]).then(function(results){
   // console.log("results............" , results)
    console.log("req.payload after......",req.payload)
      var user = results[0];
     // console.log("user is.....", user)
      return res.json({article: req.article.toJSONFor(user)});
  }).catch(next);
});

route.put('/:article',auth.required, (req,res,next)=>{
  console.log("came in put request", req.body)
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
      if(req.payload.id.toString()=== req.article.author._id.toString()){
            req.article.remove().then(()=>{
              console.log("deleted successfully")
              return res.sendStatus(204)
            })
      }
      else{
           res.sendStatus(403)
      }
    })
    .catch(next)
  })

  
  
  route.post('/:article/comments', auth.required , (req,res,next)=>{
    console.log("in post req")

    User.findById(req.payload.id).then((user)=>{
        if(!user){res.sendStatus(401)}

        var comment =new Comment(req.body.comment)
        comment.author = user
        comment.aritlce = req.article
        comment.save()

        req.article.comments.push(comment)

        return req.article.save().then(()=>{
            return res.json({comment : comment.toJSONFor(user)})
        })

    })
    .catch(next)
    })

    route.get('/:article/comments', auth.optional , (req,res,next)=>{
      Promise.resolve(req.payload ? User.findById(req.payload.id) : null)
      .then((user)=>{
        //if(!user){res.sendStatus(401)}

        return req.article.populate({
          path: 'comments' ,
          populate:{
          path:  'author'
          },
          options:{
            sort:{
              createdAt: 'desc'
            }
          }
        }).execPopulate().then(()=>{
          return res.json({comments: 
          req.article.comments.map((comment)=>{
            return comment.toJSONFor()
          })})
        })

    })
    .catch(next)
    })

    route.delete('/:article/comments/:comment', auth.required, (req,res,next)=>{
      User.findById(req.payload.id).then((user)=>{
          if(req.payload.id.toString() === req.comment.author._id.toString()){
            req.article.comments.remove(req.comment._id)
            
            return req.article.save().then(Comment.findOne( { _id:req.comment._id } ) 
            .remove().exec())
            .then(()=>{res.sendStatus(204)})
              
          }
          else{
            res.sendStatus(403)
          }
      })
      .catch(next)
    })


    route.post('/:article/favorite' , auth.required, (req,res,next)=>{
      User.findById(req.payload.id).then((user)=>{
        if(!user)
        res.sendStatus(401)

      return user.favorite(req.article._id).then(()=>{
         return req.article.updateFavoriteCount().then(()=>{
          return res.json({article : req.article.toJSONFor(user)})
        })
      })
        
    })
    .catch(next)
    })

    route.delete('/:article/favorite' , auth.required, (req,res,next)=>{
      User.findById(req.payload.id).then((user)=>{
        if(!user)
        res.sendStatus(401)

      return user.unfavorite(req.article._id).then(()=>{
        req.article.updateFavoriteCount().then(()=>{
          return res.json({article : req.article.toJSONFor(user)})
        })
      })
        
    })
    .catch(next)
    })
    

    route.get('/' , auth.optional , (req,res,next)=>{
      var limit = 20,
      offset= 0,
      query ={}

      if(typeof req.query.limit !== 'undefined'){
        limit = req.query.limit;
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    if(typeof req.query.tag !== 'undefined'){
        query.tagList = {"$in": [req.query.tag]};
    } 

    return Promise.all([
      req.query.author ? User.findOne({username: req.query.author}) : null,
      req.query.favorited ? User.findOne({username: req.query.favorited}) : null
    ])
    .then((results)=>{
      var author = results[0],
      favoriter = results[1]

      if(author){
        query.author = author._id
      }
      if(favoriter){
        query.id = {$in : favoriter.favorites}
      }
      else if (req.query.favorited){
        query.id = {$in : []}
      }

      return Promise.all([
        Article.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt : 'desc'})
        .populate('author')
        .exec(),
        Article.count(query).exec(),
        req.payload ? User.findById(req.payload.id) : null

      ]).then((results)=>{
        var articles= results[0],
            artcount= results[1],
            user=results[2]

           // console.log(articles)
            
              return res.json({
                articles: articles.map(function(article){
                    return article.toJSONFor(user);
                }),
                articleCount: artcount
            })
      })

    })
    .catch(next)

    

    })
    
   

  
module.exports=route
var mongoose = require('mongoose')
var uniquevalidator =require('mongoose-unique-validator')
var slug = require('slug')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment');

var Articleschema = new mongoose.Schema({
    slug:{type :String , unique:true, lowercase:true },
    title:String,
    description:String,
    body: String,
    tagList : [{type :String}],
    favoritesCount: { type:Number , default:0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
},{timestamps:true});

Articleschema.plugin(uniquevalidator, {message:"is already taken"})

Articleschema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
  
    next();
  });

Articleschema.methods.slugify = function(){
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

Articleschema.methods.toJSONFor=function(user){
    return {
        slug :this.slug,
        title:this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        favoritesCount: this.favoritesCount,
        favorited: user ? user.isFavorite(this._id) : false,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSONFor()
    }

}

Articleschema.methods.updateFavoriteCount = function(){
    article= this
    return User.count({favorites: {$in: [article._id]} } )
    .then((count)=>{
      article.favoritesCount = count
      return article.save()
    })
}

mongoose.model('Article', Articleschema);
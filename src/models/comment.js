var mongoose = require('mongoose')

var comschema = new mongoose.Schema({
    body:String,
    author: {type: mongoose.Schema.Types.ObjectId , ref : 'User'},
    article: {type: mongoose.Schema.Types.ObjectId , ref : 'Article'}
},
    {timestamps:true})

    comschema.methods.toJSONFor = function(){
        return {
            id: this._id,
            body : this.body,
            author  : this.author.toProfileJSONFor()
        }
    }

mongoose.model('Comment' , comschema)
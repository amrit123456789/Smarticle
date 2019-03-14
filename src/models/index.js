// const Sequelize = require('sequelize')
// const slug = require('slug')

// const db = new Sequelize({
//   database: 'realworlddb',
//   username: 'realworlduser',
//   password: 'realworldpass',
//   dialect: 'mysql'
// })

// const Users = db.define('user', {
//   email: {
//     type: Sequelize.STRING,
//     // validate: {
//     //   isEmail: true
//     // },
//     unique: true,
//     allowNull: false
//   },
//   username: {
//     type: Sequelize.STRING,
//     primaryKey: true
//   },
//   bio: Sequelize.STRING,
//   image: {
//     type: Sequelize.STRING,
//     allowNull: true,
//     // validate: {
//     //   isUrl: true
//     // }
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// Users.prototype.toProfileJSONFor= function(user) {
//   return {
//     username: this.username,
//     bio: this.bio,
//     image: this.image,
//     following: false // we will change this later
// }
// }

// const Articles = db.define('article', {
//   "slug": {
//     type: Sequelize.STRING,
//     validate:{
//       isLowercase:true
//     }
//     primaryKey: true
//   },
//   "title": {
//     type: Sequelize.STRING(50),
//     allowNull: false
//   },
//   "description": {
//     type: Sequelize.STRING(100),
//   },
//   "body": Sequelize.STRING,
//   "taglist":
// })

// const Comments = db.define('comment', {
//   body: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })

// const Tags = db.define('tag', {
//   name: {
//     type: Sequelize.STRING,
//     primaryKey: true
//   }
// })

// Comments.belongsTo(Articles)
// Articles.hasMany(Comments)

// Comments.belongsTo(Users, { as: 'author' })

// Articles.belongsTo(Users, { as: 'author' })
// Users.hasMany(Articles)

// Articles.belongsToMany(Users, { through: 'favourites' })
// Users.belongsToMany(Articles, { through: 'favourites' })

// Articles.belongsToMany(Tags, { through: 'article_tags' })
// Tags.belongsToMany(Articles, { through: 'article_tags' })


// module.exports = {
//   db,
//   Users, Articles, Comments, Tags
// }

var mongoose= require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    email: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    bio: String,
    image: String,
    salt: String,
    hash: String
}, {timestamps: true});


UserSchema.plugin(uniqueValidator, {message: "is already taken."});
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateJWT()
    };
};

mongoose.model('User', UserSchema);
const Router =require('express').Router

const route =Router()

route.use('/users' , require('./users') )
route.use('/user' , require('./user') )
route.use('/profiles' , require('./profiles') )
route.use('/tags' , require('./tags') )
route.use('/articles' , require('./articles') )
route.use('/auth' , require('./auth') )

module.exports=route
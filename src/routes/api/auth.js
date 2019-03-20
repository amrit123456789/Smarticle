const route = require('express').Router()
//const passport = require('../../passport')
var path = require('path');
//const  User=require('../../db').User

// route.get('/signup', (req, res) => {
//     console.log("i am in signup.....")
//     res.sendFile(path.join(__dirname, '../../public/pages/auth.html'))
// })

route.get('/login', (req, res) => {
    console.log("i am in login.....")
    res.sendFile(path.join(__dirname, '../../public/pages/login.html'))
})


exports = module.exports = route
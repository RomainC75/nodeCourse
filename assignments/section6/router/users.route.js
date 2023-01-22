const router = require('express').Router()
const fs = require('fs')
const data = require('../data/data')

router.get('/',(req,res,next)=>{
    res.render('users',{
        pageTitle: 'User page',
        url:'/users',
        users:data
    })
})

router.post('/new-user',(req,res,next)=>{
    if( 'username' in req.body){
        data.push(req.body)
    }
    console.log('==> data : ',data)
    res.redirect('/users')
})

module.exports = router
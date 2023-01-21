const router = require('express').Router()
const path = require('path')

router.get('/',(req,res,next)=>{
    console.log('==>router user')
    res.sendFile(path.join(__dirname,'..','views','user.html'))
})

module.exports = router
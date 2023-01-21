const path = require('path')
const router = require('express').Router()
const rootDir = require('../utils/path')

router.get('/',(req,res,next)=>{
    console.log('shop route')
    // res.send('<h1>Shop section</h1>')
    res.sendFile(path.join(rootDir, 'views','shop.html'))
    // next()
})

module.exports = router
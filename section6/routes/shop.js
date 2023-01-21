const path = require('path')
const router = require('express').Router()
const rootDir = require('../utils/path')
const productData = require('./admin').products

router.get('/',(req,res,next)=>{
    console.log('shop route')
    console.log('productData', productData)
    res.render('shop',{prods: productData, docTitle:"Shop"})
})

module.exports = router
const router = require('express').Router()
const path = require('path')
const rootDir = require('../utils/path')

router.get('/add-product',(req,res,next)=>{
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="product"><button type="submit">send</button></form>')
    // res.sendFile(path.join(__dirname,'..','views','add-product.html'))
    res.sendFile(path.join(rootDir, 'views','add-product.html'))
})

router.post('/add-product',(req,res,next)=>{
    console.log('body', req.body)
    
    // res.send('<h1>sent</h1>')
    res.redirect('/')
    // const arr= []
    // req.on('data',data=>{
    //     arr.push(data)
    // })
    // req.on('end',()=>{
    //     const bodyParsed = Buffer.concat(arr).toString()
    //     console.log('message ', bodyParsed)
    // })
})


module.exports=router
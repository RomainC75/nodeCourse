const path=require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const port = 5000

const app = express()

// template engine settings
app.set('view engine', 'pug')
app.set('views', './section6/views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{
    console.log('==>',req.method,req.url)
    next()
})

app.use('/admin',require('./routes/admin').routes)
app.use('/',require('./routes/shop'))

app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views/404.html'))
    res.render('404')
})


// const server = http.createServer(app)
// server.listen(port)
app.listen(port)
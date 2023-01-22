const http= require('http')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine', 'ejs') 
app.set('views', './assignments/section6/views');

app.use('/',(req,res,next)=>{
    console.log(`${req.url} ${req.method}`)
    next()
})

app.use('/users',require('./router/users.route'))
app.use('/',require('./router/home.route'))

app.listen(port)
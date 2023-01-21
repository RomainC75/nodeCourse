const http = require('http')
const express = require('express')
const path = require('path')

const port = 5000
const app = express()

app.use(express.static(path.join(__dirname,'public')))


app.use('/user',require('./routes/user.route'))
app.use('/house',require('./routes/house.route'))

app.listen(port)
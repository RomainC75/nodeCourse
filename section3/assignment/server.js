const http =require('http')
const port = 3001
const requestHandler= require('./routes')

const server = http.createServer((req,res)=>{
    requestHandler(req,res)
})


server.listen(port,null,()=>{console.log(`server on port : ${port}`)})
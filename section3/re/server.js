const http = require('http')
const fs = require('fs')
const port=5000

const server = http.createServer((req,res)=>{
    const url = req.url
    if(url === '/'){
        // res.setHeader('')
        res.write('<html>')
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body>'
          );
        res.write('</html>')
        res.end()
    }else if(req.method==='POST' && url==='/message'){
        const dataArr = []
        req.on('data',data=>{
            dataArr.push(data)
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(dataArr).toString()
            const message = parsedBody.split('=')[1]
            console.log('message', message)
            fs.writeFile('message.txt',message,(err)=>{
                if(err){throw Error}
                res.statusCode=302
                res.setHeader('Location','/')
                res.end()
            })
        })
    }
})



server.listen(port,()=>console.log(`started at port : ${port}`))
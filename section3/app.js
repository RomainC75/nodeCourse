const http = require("http");
const fs = require("fs");
const { parse } = require("path");
const requestHandler = require('./routess')

const server = http.createServer((req, res) => {
    if(req.url==="/"){
        requestHandler(req,res)
    }
});

server.listen(5000);

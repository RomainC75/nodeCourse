const requestHandler = (req,res) =>{  
      if (req.url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    console.log(" ====>", req.headers);
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsed : ", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          throw Error;
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write("<html>");
  res.write("<body><h1>Welcome<h1></body>");
  res.write("</html>");
  res.end();
}

module.exports=requestHandler
const fs = require("fs");

const handleRoutes = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write(
      '<body><h1>greetings</h1><form action="/create-user" method="POST"><input type="text" name="user"/><button type="submit">submit</button></form></body>'
    );
    res.write("</html>");
    res.end();
  } else if (url === "/users") {
    res.write("<html>");
    res.write("<body><ul><li>bob</li><li>sponge</li></ul></body>");
    res.write("</html>");
    res.end();
  } else if (url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk ", chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      const user = data.split("=")[1];
      console.log("user : ", user);
      fs.writeFile("data.txt", user, (error) => {
        if (error) {
          throw Error;
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = handleRoutes;

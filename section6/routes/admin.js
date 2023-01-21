const router = require("express").Router();
const path = require("path");
const rootDir = require("../utils/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  // res.send('<form action="/admin/product" method="POST"><input type="text" name="product"><button type="submit">send</button></form>')
  // res.sendFile(path.join(__dirname,'..','views','add-product.html'))
  // res.sendFile(path.join(rootDir, 'views','add-product.html'))
  res.render("add-product", {
    prods: products,
    title: "add a new product",
    path: '/admin/add-product'
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({
    title: req.body.title,
  });
  console.log("body", req.body);

  res.redirect("/");
});

exports.routes = router;
exports.products = products;

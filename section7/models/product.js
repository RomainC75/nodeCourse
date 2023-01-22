const fs = require("fs");
const path = require("path");
// const { products } = require("../../section6-handlebars copy/routes/admin");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "product.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};



module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductFromFile((data) => {
      data.push(this);
      fs.writeFile(p, JSON.stringify(data), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};

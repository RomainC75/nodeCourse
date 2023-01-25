const { createVerify } = require("crypto");
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      console.log('==> 1 ', cart)
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p,JSON.stringify(cart), err=>{
        console.log('=>Cart I/O error', err)
      })
    });
  }

  static deleteProduct(id, productPrice, cb){
    fs.readFile( p, (err, fileContent)=>{
        console.log('file content : ', fileContent)
        const cart = JSON.parse(fileContent)
        const foundIndex = cart.products.findIndex(prod=>prod.id===id)
        if(foundIndex<0){ return cb(true) }
        console.log('delete card : index : ', foundIndex)
        const price = cart.products[foundIndex].qty*productPrice
        cart.totalPrice = cart.totalPrice - price
        const updatedProducts=[...cart.products]
        updatedProducts.splice(foundIndex,1)
        const updatedCart={
            totalPrice: cart.totalPrice,
            products: updatedProducts
        }
        fs.writeFile(p,JSON.stringify(updatedCart),err=>{
            if(err){cb(false)}
            cb(true)
        })
    } )
  }

  static getProduts(cb){
    fs.readFile(p, (err, data)=>{
        if(err){console.log('error getting cart file content')}
        cb(JSON.parse(data))
    })
  }
};

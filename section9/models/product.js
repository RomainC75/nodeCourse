const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProduct = products.findIndex(product=>product.id===this.id)    
        const updatedProduct = [...products]
        updatedProduct[existingProduct] = this
        console.log('updated : ', updatedProduct)
        fs.writeFile(p,JSON.stringify(updatedProduct),(err)=>{
          if(err){console.log('error : ', err)}
          console.log('saved !!', p)
        })
      }else{
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static delete(id, cb){
    console.log('=> id : ', id)
    getProductsFromFile(products=>{
      const foundIndex = products.findIndex(prod=>prod.id===id)
      if(foundIndex<0){ return console.log(`${id} not found`) }
      const deletedProduct = products[foundIndex]
      const buff = [...products]
      buff.splice(foundIndex,1)
      fs.writeFile(p, JSON.stringify(buff), err=>{
        if(err){
          cb(false);
        }
        cb(deletedProduct);
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products=>{
      const product = products.find(p=>p.id===id)
      cb(product)
    })
  }

  

  // update(updatedProduct){
  //   getProductsFromFile(products=>{
  //     const foundIndex = products.findIndex(product=>product.id===updatedProduct)
  //     if(foundIndex===-1){return null}
  //     products[foundIndex]=updatedProduct
  //     fs.writeFile(p,JSON.parse(products),(err)=>{
  //       if(err){console.log('error : ', err)}
  //     })
  //   })
  // }
};

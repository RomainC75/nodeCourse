const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  console.log('new product added ')
  res.redirect('/');

};

exports.getEditProduct = (req, res, next) => {
  console.log('edit')
  const editMode = req.query.edit
  if(!editMode){
    res.redirect('/')
  }
  const productId = req.params.productId
  Product.findById(productId, product=>{
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product: product,
      editing: editMode
    });
  })
};

exports.postEditProduct = (req,res,next) =>{
  console.log('post edit : ', req.body)
  // const id = req.params.productsId
  const {productId, title, imageUrl, price, description} = req.body
  const updatedProduct = new Product(productId, title, imageUrl, description, price)
  updatedProduct.save()
  // res.redirect(`/products/${productId}`)
  res.redirect(`/products/`)
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req,res,next) =>{
  const id=req.body.productId
  Product.delete(id, deletedProduct=>{
    if(deletedProduct){
      Cart.deleteProduct(id, deletedProduct.price,ans=>{
        
          res.redirect('/products')
        

      })
    }else{
      res.redirect('/error')
    }
  })
}


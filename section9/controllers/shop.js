const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  console.log("get products");
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    console.log("===", product);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  const bigCart = [];
  Cart.getProduts((cart) => {
    Product.fetchAll((products) => {
      for (let product of products) {
        const foundInCart = cart.products.find(
          (cartProd) => cartProd.id === product.id
        );
        if (foundInCart) {
          bigCart.push({
            ...product,
            qty: foundInCart.qty,
          });
        }
      }
      console.log("big cart : ", bigCart);
      console.log("/card", cart);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cart: bigCart,
        totalPrice: cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  console.log("POST /cart", req.body);
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, parseFloat(product.price));
  });
  res.redirect("/cart");
};

exports.deleteItemFromCart = (req,res,next)=>{
  console.log('deleteItem : ', req.body)
  Cart.deleteProduct(req.body.productId, req.body.price,deletedItem=>{
    console.log('deleted : ', deletedItem)
    res.redirect('/cart')
  })
}



exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

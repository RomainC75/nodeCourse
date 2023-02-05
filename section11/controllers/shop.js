const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log("products : ", products);
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    console.log("product :", product);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (error) {
    next(error);
  }
  //   const prodId = req.params.productId;
  //   Product.findById(prodId)
  //     .then(([product]) => {
  //       res.render('shop/product-detail', {
  //         product: product[0],
  //         pageTitle: product.title,
  //         path: '/products'
  //       });
  //     })
  //     .catch(err => console.log(err));
};

exports.getIndex = async (req, res, next) => {
  try {
    const ans = await Product.findAll();
    console.log("ans : ", ans);
    res.render("shop/index", {
      prods: ans,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    // const products = await (await req.user.getCart()).getProducts()
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    console.log("================= : ", products);
    console.log("=> CART ::::::::::::::::::::::::::::::: ", cart.id);
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
      cartId: cart.id,
    });
  } catch (error) {
    console.log("eerror : ", error);
  }

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

// ICI
// exports.postCart = async (req, res, next) => {
//   try {
//     const prodId = req.body.productId;
//     let fetchedCart = await req.user.getCart();
//     const products = await fetchedCart.getProducts({ where: { id: prodId } });

//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     let newQuantity = 1;

//     if (product) {
//       const oldQuantity = product.cartItem.quantity;
//       newQuantity = oldQuantity + 1;
//       console.log("fetched : ", fetchedCart);
//       fetchedCart = await fetchedCart.addProduct(product, {
//         through: {
//           quantity: newQuantity,
//         },
//       });
//     }

//     const prod = await Product.findByPk(prodId);
//     fetchedCart.addProduct(prod, {
//       through: {
//         quantity: newQuantity,
//       },
//     });
//     res.redirect("/cart");
//   } catch (error) {
//     console.log('post error : ', error)
//   }

// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const fetchedCart = await req.user.getCart();
    const fetchedProducts = await fetchedCart.getProducts({
      where: { id: prodId },
    });
    if (!fetchedProducts) {
      res.status(200).json({ message: "not found" });
    }
    await fetchedProducts[0].cartItem.destroy();
    res.redirect("/cart");
  } catch (error) {
    next(error);
  }

  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({include: ['products']});
    console.log(
      "++++orders :",
      // await Promise.all(orders.map((order) => order.orderItem.getProducts()))
    );
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postOrders = async (req, res, next) => {
  console.log("postOrders route ");
  console.log(req.body);
  try {
    const fetchedCart = await req.user.getCart();
    console.log("fetchedCart : ", fetchedCart);
    const products = await fetchedCart.getProducts();
    console.log("products : ", products);

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = {
          quantity: product.cartItem.quantity,
        };
        return product;
      })
    );
    await fetchedCart.setProducts(null);
    res.redirect("/orders");
  } catch (error) {}
};

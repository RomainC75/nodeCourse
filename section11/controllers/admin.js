const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    const ans = await req.user.createProduct({
      title,
      price,
      imageUrl,
      description,
      // userId:req.user.id
    });
    console.log("ans : ", ans);
  } catch (error) {
    next(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    // const product = await Product.findByPk(prodId);
    const [product] = await req.user.getProducts({where:{id:prodId}})
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    console.log('received : ', req.body)
  
    const product = await Product.findByPk(prodId)
    product.title=req.body.title
    product.price=req.body.price
    product.imageUrl=req.body.imageUrl
    product.description=req.body.description
    product.save()
    res.redirect("/admin/products");
  } catch (error) {
    next(error)
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.findAll();
    const products = await req.user.getProducts()
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    next(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  // Product.destroy({id:prodId});
  const product = await Product.findByPk(prodId)
  await product.destroy()

  res.redirect("/admin/products");
};

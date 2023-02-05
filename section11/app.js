const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();

app.set("view engine", "ejs");
app.set("views", "./section11/views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  req.user = await User.findByPk(1);
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
//
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{ through: OrderItem})
// Product.belongsToMany(Order, {through: OrderItem})

//sync the models to the db
sequelize
    // .sync({force:true})
  .sync()
  .then(async (result) => {
    return User.findByPk(1);
    // console.log(result)
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "bob",
        email: "test.test.com",
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

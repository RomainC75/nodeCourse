const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './section7/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { handle404 } = require('./controllers/errors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(handle404);

app.listen(5000);

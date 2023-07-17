const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const upload = require('express-fileupload');

const app = express();

//register view engine
app.set('view engine', 'ejs');

//register static
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //convert input to object
app.use(cookieParser());
app.use(upload());

app.use('*', checkUser)
app.get('/', requireAuth, (req, res) => {
    res.render('index');
});

app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);


app.listen(8000);
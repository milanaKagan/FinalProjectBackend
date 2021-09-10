const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require('./middleware/authMiddleware');


const app = express();
const port = 8080;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection

const dbURI = 'mongodb+srv://milana:milana89@cluster0.wiq3z.mongodb.net/node-auth';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', checkUser,(req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.get('/smoothies-specials', requireAuth,(req, res) => res.render('smoothies-special'));
app.use(authRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));

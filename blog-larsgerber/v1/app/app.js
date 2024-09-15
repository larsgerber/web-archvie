const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const mailRoutes = require('./routes/mailRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const dotenv = require('dotenv');
const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


// blog middleware
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', { url: req.url }));

// auth routes
app.use(authRoutes);

// mail route
app.use('/mail', mailRoutes);

// blog routes
app.use('/blogs', blogRoutes);

// contact route
app.get('/contact', (req, res) => res.render('contact', { captcha: process.env.CAPTC_PUB_KEY, url: req.url, title: "Contact" }));

// impressum route
app.get('/impressum', (req, res) => res.render('impressum'));

// prank route
app.get('/surprise', (req, res) => res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));

// blog 404 page
app.get('/page-not-found', (req, res) => res.status(404).render('404'));
app.use((req, res) => {
  res.status(404).redirect('/page-not-found');
});


// database connection
const dbURI = process.env.MONGO_DB_URI;
mongoose.connect(dbURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.SERVER_PORT))
  .then((result) => console.log("Server startet at http://localhost:" + process.env.SERVER_PORT))
  .catch((err) => console.log(err));
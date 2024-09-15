const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    redirectToLogin(req, res);
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        var name = user.email;
        var name = name.charAt(0).toUpperCase() + name.substring(1, name.indexOf('.'));
        res.locals.user = user;
        res.locals.name = name;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// redirect for current method
function redirectToLogin(req, res) {
  if (req.method == "PUT" || req.method == "DELETE") {
    res.json({ redirect: `/login` });
  } else {
    res.redirect('/login');
  }
}

module.exports = { requireAuth, checkUser };
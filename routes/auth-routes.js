// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require('passport');

// Custom middleware to check if user is logged in


// User model
const User = require("../models/user");
// Place model
const Place = require("../models/place");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// GET  '/logout'
router.get("/logout", (req, res) => {
  /* Passport exposes a `logout()` method on `req` that can be called
  from any route handler. `req.logout()` deletes the session from the session storage
  and in this way "logs out" the user
  . */
  req.logout();
  res.redirect("/");
});

// // POST '/private-page'
// router.post("/private", (req, res, next) => {

//   const { name } = req.body;
// })

// GET  '/login'
router.get("/login", (req, res, next) => {
  res.render("auth/login", {"message": req.flash('error') } );
});


// POST  '/login'
router.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  passReqToCallback: true
}));


// GET  '/signup'
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


// POST  '/signup'
router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then((user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hashPass });

    newUser.save((err, userDoc) => {
      if (err) res.render("auth/signup", { message: "Something went wrong" });
      else {
        // req.user = userDoc;
        res.render("auth/login", { user: userDoc})};
    });
  })
  .catch(error => next(error))
});

module.exports = router;
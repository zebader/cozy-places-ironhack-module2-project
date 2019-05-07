'use strict';

const authMiddlewares = {
  checkIfAuthenticated: (req, res, next) => {
    if(!req.user) res.redirect('/login'); // if not logged in / authenticated
    else next();  // if logged in / authenticated
  }
};

module.exports = authMiddlewares;
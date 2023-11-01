const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")


//singup form and singup put request
router
.route("/signup")
.get(userController.renderSingupForm)
.post(wrapAsync(userController.signup));
  


//login form and login get request
router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: '/login',
  failureFlash: true,
  }),   
  userController.login
  );

//get logout
router.get("/logout", userController.logout);






module.exports = router;
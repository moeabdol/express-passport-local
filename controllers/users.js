const passport = require("passport");

const getSignUp = (req, res) => {
  res.render("signup");
};

const signUp = passport.authenticate("local.signup", {
  successRedirect:  "/profile",
  failureRedirect:  "/signup",
  failureFlash:     true
});

const getSignIn = (req, res) => {
  res.render("signin");
};

const signIn = passport.authenticate("local.signin", {
  successRedirect:  "/profile",
  failureRedirect:  "/signin",
  failureFlash:     true
});

const signOut = (req, res) => {
  req.logout();
  res.redirect("/");
};

const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};

module.exports = {
  getSignUp,
  signUp,
  getSignIn,
  signIn,
  signOut,
  getProfile
};

const passport = require("passport");

const getSignUp = (req, res) => {
  res.render("signup");
};

const createUser = passport.authenticate("local-signup", {
  successRedirect:  "/profile",
  failureRedirect:  "/signup",
  failureFlash:     true
});

const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};

module.exports = {
  getSignUp,
  createUser,
  getProfile
};

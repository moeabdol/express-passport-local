const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User          = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});

passport.use("local.signup", new LocalStrategy({
  usernameField:      "email",
  passwordField:      "password",
  passReqToCallback:  true
}, (req, email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err)  { return done(err); }
    if (user) {
      req.flash("error", "User already exists!");
      return done(null, false);
    }

    let newUser = new User({
      fullname: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save((err) => {
      if (err) { return done(err); }
      done(null, newUser);
    });
  });
}));

passport.use("local.signin", new LocalStrategy({
  usernameField:      "email",
  passwordField:      "password",
  passReqToCallback:  true
}, (req, email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err)  { return done(err); }
    if (!user) {
      req.flash("error", "User email not found!");
      return done(null, false);
    }
    if (!user.validatePassword(password)) {
      req.flash("error", "User password is incorrect!");
      return done(null, false);
    }
    return done(null, user);
  });
}));

const express  = require("express");
const passport = require("passport");
const users    = require("../controllers/users");

const router = express.Router();

router.get("/signup", users.getSignUp);

module.exports = router;

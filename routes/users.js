const express  = require("express");
const users    = require("../controllers/users");

const router = express.Router();

router.get("/signup", users.getSignUp);
router.post("/signup", users.signUp);
router.get("/signin", users.getSignIn);
router.post("/signin", users.signIn);
router.get("/signout", users.signOut);
router.get("/profile", users.isSignedIn, users.getProfile);

module.exports = router;

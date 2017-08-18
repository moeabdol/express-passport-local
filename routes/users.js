const express  = require("express");
const users    = require("../controllers/users");

const router = express.Router();

router.get("/signup", users.getSignUp);
router.post("/signup", users.createUser);
router.get("/profile", users.getProfile);

module.exports = router;

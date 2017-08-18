const mongoose = require("mongoose");
const bcrypt   = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next();
});

module.exports = mongoose.model("User", UserSchema);

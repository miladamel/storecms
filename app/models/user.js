const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueString = require("unique-string");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: null },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
    if (err) console.log(err);
    this.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie("remember_token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: true,
  });
  this.updateOne({ rememberToken: token }, (err) => {
    if (err) console.log(err);
  });
};

module.exports = mongoose.model("User", userSchema);

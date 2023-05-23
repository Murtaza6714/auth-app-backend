const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Config = require("../Config");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    //   required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    //   required: true
  },
},{
  timestamps: true
});

userSchema.methods.validatePassword = function (password) {
  const isValid = bcrypt.compareSync(password, this.password);
  return isValid;
};

userSchema.methods.generateLoginToken = function () {
  const signedToken = jwt.sign({ _id: this._id, email: this.email, type: this.type}, Config.jwtOption.secret, {
    expiresIn: Config.jwtOption.expiresIn,
  });
  return signedToken;
};

module.exports = mongoose.model("User", userSchema);

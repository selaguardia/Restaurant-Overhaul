const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName:{
      type: String,
      required: [true, "Please enter your first name."],
    },
    lastName:{
      type: String,
      required: [true, "Please enter your last name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a secure password."],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
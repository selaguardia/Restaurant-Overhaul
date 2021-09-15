const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName:{
      type: String,
      required: [true, "Please Provide your first name."],
    },
    lastName:{
      type: String,
      required: [true, "Please Provide your last name."],
    },
    email: {
      type: String,
      required: [true, "Please Provide An Email Address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide A Password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

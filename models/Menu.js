const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// require("../config/db.connections");

const MenuSchema = new Schema(
  {
    dishName: {
      type: String,
      required: [true, "What is the dish called?"],
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Please provide a description of the dish."],
    },

    lunchPrice: {
      type: Number,
      min: [0, "Price must be greater than $0.00"],
      required: [true, "How much is this dish during lunch?"],
    },

    dinnerPrice: {
      type: Number,
      min: [0, "Price must be greater than $0.00"],
      required: [true, "How much is this dish during dinner?"],
    },

    category: {
      type: String,
      required: [true, "Select food category"],
    },

    foodPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;

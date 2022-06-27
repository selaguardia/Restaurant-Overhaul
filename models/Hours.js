const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoursSchema = new Schema(
  {
    day: { type: String },
    open: { type: Number },
    close: { type: Number },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Hours = mongoose.model("Hours", HoursSchema);
module.exports = Hours;

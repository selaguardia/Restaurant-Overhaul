const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoursSchema = new Schema(
  {
    day: { type: Date }, //mon - sun
    open: { type: Date },
    close: { type: Date },
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

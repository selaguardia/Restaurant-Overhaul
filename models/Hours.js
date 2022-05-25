const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoursSchema = new Schema(
  {
    dayOfWeek: {
      type: String,
      required: [true, "What day of the week?"],
      unique: true,
    },
    openingHour: {
      type: String,
      required: [true, "What time do you open?"],

    },
    closingHour: {
      type: String,
      required: [true, "What time do you close?"],

    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Hours = mongoose.model('Hours', HoursSchema);
module.exports = Hours;

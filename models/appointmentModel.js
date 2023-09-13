const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: Number,
      required: true,
    },
    course: {
      type: Number,
      required: true,
    },
    starts: {
      type: String,
      required: true,
    },
    ends: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;

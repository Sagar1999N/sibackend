const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const Course = require("../models/courseModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-instructors", authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({});
    res.status(200).send({
      message: "Instructors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching instructors",
      success: false,
      error,
    });
  }
});

router.get("/get-all-lectures", authMiddleware, async (req, res) => {
  try {
    const doctors = await Appointment.find({});
    res.status(200).send({
      message: "lectures fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching lectures",
      success: false,
      error,
    });
  }
});

router.get("/get-all-courses", authMiddleware, async (req, res) => {
  try {
    const doctors = await Course.find({});
    res.status(200).send({
      message: "courses fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching courses",
      success: false,
      error,
    });
  }
});

module.exports = router;

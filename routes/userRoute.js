const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
const courseModel = require("../models/courseModel");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/add-course", authMiddleware, async (req, res) => {
  try {
    const newAppointment = new courseModel(req.body);
    await newAppointment.save();
    res.status(200).send({
      message: "Course added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error adding course",
      success: false,
      error,
    });
  }
});

router.post("/schedule-lecture", authMiddleware, async (req, res) => {
  try {
    req.body.status = "scheduled";
    req.body.starts = moment(
      req.body.starts,
      "YYYY-MM-DD HH:mm:ss"
    ).toISOString();
    req.body.ends = moment(req.body.ends, "YYYY-MM-DD HH:mm:ss").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).send({
      message: "Lecture scheduled successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error scheduling lecture",
      success: false,
      error,
    });
  }
});

// router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await Appointment.find({
//       doctorId,
//       date,
//       time: { $gte: fromTime, $lte: toTime },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not available",
//         success: false,
//       });
//     } else {
//       return res.status(200).send({
//         message: "Appointments available",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error booking appointment",
//       success: false,
//       error,
//     });
//   }
// });

router.post(
  "/get-lectures-by-instructor-id/",
  authMiddleware,
  async (req, res) => {
    const { instructorId } = req.body;
    console.log(instructorId);
    try {
      const appointments = await Appointment.find({
        instructor: instructorId,
      });
      res.status(200).send({
        message: "lectures fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching lectures",
        success: false,
        error,
      });
    }
  }
);

router.get("/get-lectures-by-course-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      course: req.body.course,
    });
    res.status(200).send({
      message: "lectures fetched successfully",
      success: true,
      data: appointments,
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
module.exports = router;

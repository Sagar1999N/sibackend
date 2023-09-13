const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// router.post("/get-instructor-info-by-id", authMiddleware, async (req, res) => {
//   try {
//     const doctor = await User.findOne({ _id: req.body.doctorId });
//     res.status(200).send({
//       success: true,
//       message: "Doctor info fetched successfully",
//       data: doctor,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error getting doctor info", success: false, error });
//   }
// });

// router.get(
//   "/get-appointments-by-doctor-id",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const doctor = await User.findOne({ userId: req.body.userId });
//       const appointments = await Appointment.find({ doctorId: doctor._id });
//       res.status(200).send({
//         message: "Appointments fetched successfully",
//         success: true,
//         data: appointments,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Error fetching appointments",
//         success: false,
//         error,
//       });
//     }
//   }
// );

module.exports = router;

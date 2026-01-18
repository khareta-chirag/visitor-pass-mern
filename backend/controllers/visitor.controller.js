const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.registerVisitor = async (req, res) => {
  try {
    const { name, phone, purpose, date } = req.body;

    const visitor = await Visitor.create({
      name,
      phone,
      purpose,
      photo: req.file?.path,
    });

    const host = await User.findOne({ role: "employee" });

    if (!host) {
      return res.status(400).json({ message: "No employee found" });
    }

    await Appointment.create({
      visitor: visitor._id,
      host: host._id,
      date,
      status: "pending",
    });

    res.json({ message: "Visitor Registered Successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

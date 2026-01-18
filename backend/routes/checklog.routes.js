const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

const { checkIn, checkOut } = require("../controllers/checklog.controller");

router.post("/in", protect, allowRoles("security"), checkIn);
router.post("/out", protect, allowRoles("security"), checkOut);
router.post("/verify", async (req, res) => {
  const appt = await Appointment.findOne({ _id: req.body.code.split("-")[1] });

  if (!appt || appt.status !== "approved")
    return res.status(400).json({ message: "Invalid" });

  res.json({ message: "Valid Entry" });
});

module.exports = router;

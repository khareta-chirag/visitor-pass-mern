const express = require("express");
const router = express.Router();

const {
  approveAppointment,
  getMyAppointments,
} = require("../controllers/appointment.controller");

const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.get("/my", protect, allowRoles("employee"), getMyAppointments);

router.put("/approve/:id", protect, allowRoles("employee"), approveAppointment);

module.exports = router;

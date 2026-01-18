const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const User = require("../models/User");

router.get("/", protect, allowRoles("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;

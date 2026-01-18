const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema({
  pass: { type: mongoose.Schema.Types.ObjectId, ref: "Pass" },
  checkIn: Date,
  checkOut: Date,
});

module.exports = mongoose.model("CheckLog", checkLogSchema);

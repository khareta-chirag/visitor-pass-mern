const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  host: String,
  date: String,
  photo: String,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Visitor", visitorSchema);

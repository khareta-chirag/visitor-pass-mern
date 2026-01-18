const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
  {
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: "Visitor" },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    qrCode: String,
    pdf: String,
    validTill: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pass", passSchema);

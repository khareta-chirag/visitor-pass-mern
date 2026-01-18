const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");

// GET employee appointments
exports.getMyAppointments = async (req, res) => {
  const apps = await Appointment.find({ host: req.user.id })
    .populate("visitor");
  res.json(apps);
};


// APPROVE + GENERATE QR
exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const qrText = `VISIT-${appointment._id}`;

    const qrImage = await QRCode.toDataURL(qrText);

    appointment.status = "approved";
    appointment.qrCode = qrImage;

    await appointment.save();

    res.json({ message: "Approved & QR Generated", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
};

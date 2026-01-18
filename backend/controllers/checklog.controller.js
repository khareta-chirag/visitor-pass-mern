const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

exports.checkIn = async (req, res) => {
  const { passId } = req.body;

  const log = await CheckLog.create({
    pass: passId,
    checkIn: new Date(),
  });

  res.json(log);
};

exports.checkOut = async (req, res) => {
  const { passId } = req.body;

  const log = await CheckLog.findOneAndUpdate(
    { pass: passId, checkOut: null },
    { checkOut: new Date() },
    { new: true }
  );

  res.json(log);
};

const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePass = async (visitor, appointmentId) => {
  const qrData = `VISIT-${appointmentId}`;

  const qrImage = await QRCode.toDataURL(qrData);

  const fileName = `pass-${Date.now()}.pdf`;
  const filePath = path.join("uploads", fileName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Visitor Pass", { align: "center" });
  doc.moveDown();
  doc.text(`Name: ${visitor.name}`);
  doc.text(`Phone: ${visitor.phone}`);
  doc.moveDown();

  doc.image(qrImage, { width: 150, align: "center" });

  doc.end();

  return { qrImage, filePath };
};

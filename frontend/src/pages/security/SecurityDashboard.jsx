import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../api/axios";

export default function SecurityDashboard() {
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  const onScanSuccess = async (decodedText) => {
    setScanResult(decodedText);

    try {
      const res = await api.post("/check/verify", { code: decodedText });
      setMessage(res.data.message || "Check-in successful");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid QR Code");
    }
  };

  const onScanError = () => {
    // ignore scan errors
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Security Check-In</h2>

      {/* QR Camera Box */}
      <div id="qr-reader" style={{ width: 300 }}></div>

      <p><b>Scanned:</b> {scanResult}</p>
      <h3>{message}</h3>
    </div>
  );
}

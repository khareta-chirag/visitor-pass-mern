import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function EmployeeDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await api.put(`/appointments/approve/${id}`);
      alert("Approved! QR Pass Generated");
      fetchAppointments(); // reload to show QR
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Dashboard</h2>

      {appointments.length === 0 && <p>No appointments found.</p>}

      {appointments.map((a) => (
        <div
          key={a._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          <p>
            <strong>Name:</strong> {a.visitor?.name || "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: a.status === "approved" ? "green" : "orange",
                fontWeight: "bold",
              }}
            >
              {a.status}
            </span>
          </p>

          {a.status === "pending" && (
            <button onClick={() => approve(a._id)}>Approve</button>
          )}

          {a.qrCode && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Visitor Pass QR:</strong>
              </p>
              <img src={a.qrCode} alt="QR Code" width="160" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

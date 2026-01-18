import { useState } from "react";
import axios from "../../api/axios";


function VisitorRegister() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    host: "",
    date: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("host", form.host);
      data.append("date", form.date);
      data.append("photo", photo); // must match multer field

      await axios.post("/visitors/register", data);

      alert("Visitor Registered Successfully");

      setForm({ name: "", phone: "", host: "", date: "" });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Visitor Registration</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="host"
          placeholder="Select Host"
          value={form.host}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default VisitorRegister;

import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

export default function CarForm({ token, onCarAdded }) {
  const [make, setMake] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/cars`, { make, licensePlate, color }, { headers: { Authorization: `Bearer ${token}` } });
      setMake(""); setLicensePlate(""); setColor("");
      onCarAdded();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add car");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" />
      <input value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} placeholder="License Plate" />
      <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />
      <button type="submit">Add Car</button>
    </form>
  );
}

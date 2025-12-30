import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

export default function ParkCarForm({ token, cars, onParked }) {
  const [carId, setCarId] = useState("");
  const [floor, setFloor] = useState("");
  const [availableSpots, setAvailableSpots] = useState([]);
  const [spotNumber, setSpotNumber] = useState("");

  // Fetch available spots whenever floor changes
  useEffect(() => {
    const fetchSpots = async () => {
      if (!floor) return;
      try {
        const res = await axios.get(`${API}/spots/available?floor=${floor}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableSpots(res.data);
        setSpotNumber("");
      } catch (err) {
        alert("Failed to fetch available spots");
      }
    };
    fetchSpots();
  }, [floor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}/parking`,
        { carId, floor: parseInt(floor), spotNumber: parseInt(spotNumber) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCarId("");
      setFloor("");
      setSpotNumber("");
      setAvailableSpots([]);
      onParked();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to park car");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Park a Car</h4>

      <select value={carId} onChange={(e) => setCarId(e.target.value)} required>
        <option value="">Select Car</option>
        {cars.map((c) => (
          <option key={c.id} value={c.id}>
            {c.make} ({c.licensePlate})
          </option>
        ))}
      </select>

      <input
        type="number"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        placeholder="Floor"
        min="1"
        required
      />

      <select value={spotNumber} onChange={(e) => setSpotNumber(e.target.value)} required>
        <option value="">Select Spot</option>
        {availableSpots.map((s) => (
          <option key={s.id} value={s.spotNumber}>
            Spot {s.spotNumber}
          </option>
        ))}
      </select>

      <button type="submit">Park Car</button>
    </form>
  );
}

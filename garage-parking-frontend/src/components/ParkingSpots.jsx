import axios from "axios";

const API = "http://localhost:8080/api";

export default function ParkingSpots({ token, parkedCars, refresh }) {

  const leaveSpot = async (id) => {
    try {
      await axios.delete(`${API}/parking/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      refresh();
    } catch (err) {
      alert("Failed to leave spot");
    }
  };

  return (
    <ul>
      {parkedCars.map((p) => (
        <li key={p.car.id}>
          {p.car.make} ({p.car.licensePlate}) - Floor {p.spot.floor}, Spot {p.spot.spotNumber} 
          <button onClick={() => leaveSpot(p.id)}>Leave</button>
        </li>
      ))}
    </ul>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import CarForm from "./CarForm.jsx";
import ParkingSpots from "./ParkingSpots.jsx";
import ParkCarForm from "./ParkCarForm.jsx";

const API = "http://localhost:8080/api";

export default function Dashboard({ token, user, onLogout }) {
  const [cars, setCars] = useState([]);
  const [parkedCars, setParkedCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get(`${API}/cars`, { headers: { Authorization: `Bearer ${token}` } });
    setCars(res.data);
  };

  const fetchParkedCars = async () => {
    const res = await axios.get(`${API}/parking/active`, { headers: { Authorization: `Bearer ${token}` } });
    setParkedCars(res.data);
  };

  useEffect(() => {
    fetchCars();
    fetchParkedCars();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.firstName}</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>My Cars</h3>
      <CarForm token={token} onCarAdded={fetchCars} />
      <ul>
        {cars.map((c) => (
          <li key={c.id}>
            {c.make} - {c.licensePlate} - {c.color}
          </li>
        ))}
      </ul>

      <h3>Park a Car</h3>
	<ParkCarForm token={token} cars={cars} onParked={fetchParkedCars} />

	<h3>Parked Cars</h3>
	<ParkingSpots token={token} parkedCars={parkedCars} refresh={fetchParkedCars} />
    </div>
  );
}

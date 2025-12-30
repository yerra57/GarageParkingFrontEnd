import { useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <>
        <Login onLogin={handleLogin} />
        <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setShowRegister(true)}>
          Don't have an account? Register
        </p>
      </>
    );
  }

  return <Dashboard token={token} user={user} onLogout={handleLogout} />;
}

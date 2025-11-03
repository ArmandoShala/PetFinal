import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { UserContext } from "../context/UserContext";
import "../styles/Login.css";
import logo from "../assets/Logo.png";

function Login() {
  const { rol } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (email === "admin@petcare.com") {
        navigate("/veterinariosunificados");
      } else {
        navigate("/inicio");
      }
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrecta");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email === "admin@petcare.com") {
        navigate("/veterinariosunificados");
      } else {
        navigate("/inicio");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Logo de PetCare" className="login-logo" />
        <h2>Iniciar sesión</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>

        <div className="google-section">
          <p>o</p>
          <button className="google-button" onClick={handleGoogleLogin}>
            Iniciar con Google
          </button>
        </div>

        <div className="register-link">
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


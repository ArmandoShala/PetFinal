import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import "../styles/Register.css";
import logo from "../assets/Logo.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/inicio");
    } catch (error) {
      alert("Error al registrarse");
      console.error(error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/inicio");
    } catch (error) {
      console.error("Error con Google:", error);
      alert("Error al registrarse con Google");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <img src={logo} alt="Logo de PetCare" className="register-logo" />
          <h1>PetCare</h1>
          <h2>¡Bienvenido a PetCare!</h2>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>

        <div className="google-section">
          <p>o</p>
          <button className="google-button" onClick={handleGoogleRegister}>
             Registrarse con Google
          </button>
        </div>

        <div className="login-link">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

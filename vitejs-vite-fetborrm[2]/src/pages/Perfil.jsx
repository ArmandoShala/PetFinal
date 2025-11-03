import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  updateProfile,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Sidebar from "../components/Sidebar";
import "../styles/Perfil.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaKey, FaSignOutAlt, FaCamera } from 'react-icons/fa';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setNuevoNombre(user?.displayName || "");
      setPreview(user?.photoURL || null);
    });
    return () => unsubscribe();
  }, []);

  const handleActualizarNombre = async (e) => {
    e.preventDefault();
    try {
      if (usuario) {
        await updateProfile(usuario, { displayName: nuevoNombre });
        setMensaje("✅ Nombre actualizado correctamente.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar el nombre.");
    }
  };

  const handleCambiarContraseña = async (e) => {
    e.preventDefault();
    try {
      if (usuario && nuevaContraseña.length >= 6) {
        await updatePassword(usuario, nuevaContraseña);
        setMensaje("🔒 Contraseña actualizada correctamente.");
        setNuevaContraseña("");
      } else {
        setMensaje("⚠️ La contraseña debe tener al menos 6 caracteres.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al cambiar la contraseña.");
    }
  };

  const handleFotoSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCerrarSesion = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  if (!usuario) {
    return (
      <div className="perfil-container">
        <Sidebar />
        <div className="perfil-content">
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <Sidebar />
      <div className="perfil-content">
        <h2><FaUser style={{ marginRight: "0.5rem" }} /> Mi Perfil</h2>

        <div className="perfil-card">
          <div className="perfil-avatar">
            {preview ? (
              <img src={preview} alt="Foto de perfil" className="avatar-img" />
            ) : (
              <span>
                {usuario.displayName
                  ? usuario.displayName.charAt(0).toUpperCase()
                  : "U"}
              </span>
            )}
          </div>

          <label className="foto-label" htmlFor="foto-input">
            <FaCamera style={{ marginRight: "0.3rem" }} />
            Foto de perfil
          </label>
          <input
            id="foto-input"
            type="file"
            accept="image/*"
            onChange={handleFotoSeleccionada}
            style={{ display: "none" }}
          />

          <div className="perfil-info">
            <div className="campo">
              <label><FaUser style={{ marginRight: "0.3rem" }} /> Nombre completo</label>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            </div>

            <div className="campo">
              <label><FaEnvelope style={{ marginRight: "0.3rem" }} /> Correo electrónico</label>
              <input type="email" value={usuario.email} disabled />
            </div>

            <div className="campo">
              <label><FaPhone style={{ marginRight: "0.3rem" }} /> Teléfono</label>
              <input type="text" placeholder="+57 300 000 0000" />
            </div>

            <div className="campo">
              <label><FaMapMarkerAlt style={{ marginRight: "0.3rem" }} /> Dirección</label>
              <input type="text" placeholder="Calle, número, ciudad" />
            </div>
          </div>

          <button className="btn-guardar" onClick={handleActualizarNombre}>
            <FaSave style={{ marginRight: "0.5rem" }} />
            Guardar cambios
          </button>
        </div>

        <form onSubmit={handleCambiarContraseña} className="perfil-form">
          <label>
            <FaKey style={{ marginRight: "0.3rem" }} />
            Cambiar contraseña
          </label>
          <input
            type="password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            placeholder="Nueva contraseña"
          />
          <button type="submit" className="btn-actualizar-pass">
            <FaSave style={{ marginRight: "0.5rem" }} />
            Actualizar contraseña
          </button>
        </form>

        <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
          <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
          Cerrar sesión
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Perfil;

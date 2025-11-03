// src/pages/AgregarVeterinario.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { UserContext } from "../context/UserContext";
import "../styles/AgregarVeterinario.css";

function AgregarVeterinario() {
  const { rol } = useContext(UserContext);
  const navigate = useNavigate();

  const [nuevoVet, setNuevoVet] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setNuevoVet({ ...nuevoVet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rol !== "admin") return; // Solo admin puede agregar

    try {
      await addDoc(collection(db, "veterinarios"), nuevoVet);
      alert("Veterinario agregado correctamente");
      navigate("/veterinariosunificados");
    } catch (error) {
      console.error("Error al agregar veterinario:", error);
      alert("Error al agregar veterinario");
    }
  };

  return (
    <div className="agregar-veterinario-container">
      <h1>Agregar Veterinario</h1>
      <form onSubmit={handleSubmit} className="form-agregar">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoVet.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={nuevoVet.especialidad}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoVet.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={nuevoVet.direccion}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Veterinario</button>
      </form>
    </div>
  );
}

export default AgregarVeterinario;

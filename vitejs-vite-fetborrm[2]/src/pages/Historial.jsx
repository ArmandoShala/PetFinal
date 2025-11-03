import React, { useState } from "react";
import "../styles/Historial.css";

function Historial() {
  // Estado para los registros
  const [historial, setHistorial] = useState([
    {
      id: 1,
      mascota: "Max",
      fecha: "2024-06-10",
      descripcion: "Vacuna antirrábica",
    },
    {
      id: 2,
      mascota: "Luna",
      fecha: "2024-05-22",
      descripcion: "Chequeo general",
    },
    {
      id: 3,
      mascota: "Rocky",
      fecha: "2024-04-15",
      descripcion: "Desparasitación",
    },
  ]);

  const [nuevoRegistro, setNuevoRegistro] = useState({
    mascota: "",
    fecha: "",
    descripcion: "",
  });

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setNuevoRegistro({ ...nuevoRegistro, [e.target.name]: e.target.value });
  };

  // Agregar nuevo registro
  const handleAddRegistro = () => {
    if (!nuevoRegistro.mascota || !nuevoRegistro.fecha || !nuevoRegistro.descripcion) return;

    setHistorial([
      ...historial,
      { id: Date.now(), ...nuevoRegistro },
    ]);

    // Limpiar inputs
    setNuevoRegistro({ mascota: "", fecha: "", descripcion: "" });
  };

  // Eliminar registro
  const handleDeleteRegistro = (id) => {
    setHistorial(historial.filter((reg) => reg.id !== id));
  };

  return (
    <div className="historial-container">
      <h2 className="historial-title">📖 Historial Médico</h2>

      <div className="historial-form">
        <input
          type="text"
          name="mascota"
          placeholder="Nombre de la mascota"
          value={nuevoRegistro.mascota}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha"
          value={nuevoRegistro.fecha}
          onChange={handleChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción del registro"
          value={nuevoRegistro.descripcion}
          onChange={handleChange}
        />
        <button onClick={handleAddRegistro}>Agregar Registro</button>
      </div>

      <ul className="historial-list">
        {historial.map((reg) => (
          <li key={reg.id} className="historial-card">
            <div>
              <strong>{reg.mascota}</strong> - <em>{reg.fecha}</em>
              <p>{reg.descripcion}</p>
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDeleteRegistro(reg.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;

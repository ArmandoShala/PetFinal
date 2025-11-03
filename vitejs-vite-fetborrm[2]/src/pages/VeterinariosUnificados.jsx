import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Veterinarios.css";

function VeterinariosUnificados() {
  const { rol, loading } = useContext(UserContext);

  const [veterinarios, setVeterinarios] = useState([
    { id: 1, nombre: "Dr. Andrés Torres", especialidad: "Cirugía Veterinaria", telefono: "3104567890", direccion: "Calle 85 #12-45, Bogotá" },
    { id: 2, nombre: "Dra. Laura Rojas", especialidad: "Dermatología Veterinaria", telefono: "3129876543", direccion: "Carrera 43 #10-15, Medellín" },
    { id: 3, nombre: "Dr. Felipe Martínez", especialidad: "Cardiología Veterinaria", telefono: "3201234567", direccion: "Calle 9 #45-23, Cali" },
    { id: 4, nombre: "Dra. Carolina Gómez", especialidad: "Medicina Interna Veterinaria", telefono: "3116543210", direccion: "Carrera 15 #22-30, Bogotá" },
    { id: 5, nombre: "Dr. Santiago López", especialidad: "Odontología Veterinaria", telefono: "3137890123", direccion: "Calle 70 #8-50, Medellín" },
    { id: 6, nombre: "Dra. Valeria Suárez", especialidad: "Reproducción y Fertilidad Animal", telefono: "3145678901", direccion: "Calle 25 #32-14, Cali" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [nuevoVet, setNuevoVet] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    direccion: "",
  });

  if (loading) return <p>Cargando...</p>;

  const handleChange = (e) => {
    setNuevoVet({ ...nuevoVet, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    const id = veterinarios.length + 1;
    setVeterinarios([...veterinarios, { id, ...nuevoVet }]);
    setNuevoVet({ nombre: "", especialidad: "", telefono: "", direccion: "" });
    setShowForm(false);
  };

  return (
    <div className="veterinarios-container">
      <h1>Veterinarios</h1>

      {/* Botón solo para admin */}
      {rol === "admin" && (
        <button className="btn-registrar" onClick={() => setShowForm(!showForm)}>
          + Agregar Veterinario
        </button>
      )}

      {/* Formulario visual */}
      {showForm && rol === "admin" && (
        <form className="form-agregar" onSubmit={handleAgregar}>
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
      )}

      {/* Tarjetas */}
      <div className="veterinarios-grid">
        {veterinarios.map((v) => (
          <div key={v.id} className="veterinario-card">
            <h3>{v.nombre}</h3>
            <p><strong>Especialidad:</strong> {v.especialidad}</p>
            <p><strong>Teléfono:</strong> {v.telefono}</p>
            <p><strong>Dirección:</strong> {v.direccion}</p>

            <div className="vet-actions">
              {/* 📞 Llamada directa */}
              <a href={`tel:${v.telefono}`} className="btn-llamar">
                📞 Llamar
              </a>

              {/* 🗺️ Ver en mapa */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.direccion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mapa"
              >
                🗺️ Ver Mapa
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VeterinariosUnificados;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Sidebar from "../components/Sidebar";
import "../styles/EditarMascota.css";

function EditarMascota() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mascota, setMascota] = useState({
    nombre: "",
    tipo: "",
    raza: "",
    edad: "",
    peso: "",
    sexo: "",
    vacunas: "",
    salud: "",
    descripcion: "",
    imagenUrl: "",
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // 🔹 Cargar mascota instantáneamente
  useEffect(() => {
    (async () => {
      try {
        const ref = doc(db, "mascotas", id);
        const snap = await getDoc(ref);
        if (snap.exists()) setMascota(snap.data());
        else setMensaje("⚠️ No se encontró la mascota.");
      } catch (error) {
        console.error(error);
        setMensaje("❌ Error al cargar la mascota.");
      }
    })();
  }, [id]);

  // 🔹 Manejar cambios en los campos
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setMascota((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar cambios
  const guardarCambios = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await updateDoc(doc(db, "mascotas", id), mascota);
      setMensaje("✅ Mascota actualizada correctamente.");
      setTimeout(() => navigate("/inicio"), 1500);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar los cambios.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="editar-mascota-container">
      <Sidebar />
      <div className="editar-mascota-content">
        <h2 className="titulo-editar">✏️ Editar Mascota</h2>

        {mensaje && <div className="alerta">{mensaje}</div>}

        <form className="editar-mascota-form" onSubmit={guardarCambios}>
          <div className="grid-form">
            <div>
              <label>Nombre</label>
              <input
                name="nombre"
                value={mascota.nombre}
                onChange={manejarCambio}
                required
              />

              <label>Tipo</label>
              <input
                name="tipo"
                value={mascota.tipo}
                onChange={manejarCambio}
                placeholder="Perro, Gato, etc."
                required
              />

              <label>Raza</label>
              <input
                name="raza"
                value={mascota.raza}
                onChange={manejarCambio}
              />

              <label>Edad (años)</label>
              <input
                type="number"
                name="edad"
                value={mascota.edad}
                onChange={manejarCambio}
              />

              <label>Peso (kg)</label>
              <input
                type="number"
                name="peso"
                value={mascota.peso}
                onChange={manejarCambio}
              />
            </div>

            <div>
              <label>Sexo</label>
              <select name="sexo" value={mascota.sexo} onChange={manejarCambio}>
                <option value="">Selecciona</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>

              <label>Vacunas</label>
              <textarea
                name="vacunas"
                value={mascota.vacunas}
                onChange={manejarCambio}
                placeholder="Ejemplo: Rabia, Parvovirus..."
              />

              <label>Estado de salud</label>
              <input
                name="salud"
                value={mascota.salud}
                onChange={manejarCambio}
                placeholder="Ej: Excelente, Necesita control..."
              />

              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={mascota.descripcion}
                onChange={manejarCambio}
                placeholder="Detalles adicionales..."
              />

              <label>Imagen (URL)</label>
              <input
                type="text"
                name="imagenUrl"
                value={mascota.imagenUrl}
                onChange={manejarCambio}
                placeholder="https://..."
              />

              {mascota.imagenUrl && (
                <img
                  src={`${mascota.imagenUrl}?${Date.now()}`}
                  alt="Vista previa"
                  className="preview"
                />
              )}
            </div>
          </div>

          <button type="submit" disabled={guardando}>
            {guardando ? "💾 Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarMascota;

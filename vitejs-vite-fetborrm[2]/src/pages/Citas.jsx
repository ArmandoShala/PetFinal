import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
  FaDog,
  FaStickyNote,
} from "react-icons/fa";
import "../styles/Citas.css";

function Citas() {
  const [eventos, setEventos] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    texto: "",
    fecha: "",
    hora: "",
    mascota: "",
    descripcion: "",
  });
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);

  // 🔹 Cargar citas
  const cargarEventos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "eventos"));
      const eventosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      eventosData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setEventos(eventosData);
    } catch (error) {
      mostrarMensaje("❌ Error al cargar las citas.", "error");
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  // 🔹 Registrar nueva cita
  const registrarCita = async (e) => {
    e.preventDefault();
    const { texto, fecha, hora, mascota, descripcion } = nuevaCita;
    if (!texto || !fecha || !hora || !mascota) {
      mostrarMensaje("⚠️ Completa todos los campos obligatorios.", "error");
      return;
    }
    try {
      await addDoc(collection(db, "eventos"), {
        texto,
        fecha,
        hora,
        mascota,
        descripcion,
        completada: false,
        creadaEn: new Date().toISOString(),
      });
      mostrarMensaje("✅ Cita registrada correctamente.", "exito");
      setNuevaCita({
        texto: "",
        fecha: "",
        hora: "",
        mascota: "",
        descripcion: "",
      });
      cargarEventos();
    } catch {
      mostrarMensaje("❌ Error al registrar la cita.", "error");
    }
  };

  // 🔹 Marcar cita como completada
  const marcarCompletada = async (id, completada) => {
    try {
      const ref = doc(db, "eventos", id);
      await updateDoc(ref, { completada: !completada });
      mostrarMensaje(
        completada ? "↩️ Cita marcada como pendiente." : "✔️ Cita completada.",
        "exito"
      );
      cargarEventos();
    } catch {
      mostrarMensaje("❌ Error al actualizar la cita.", "error");
    }
  };

  // 🔹 Eliminar cita
  const eliminarCita = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta cita?")) return;
    try {
      await deleteDoc(doc(db, "eventos", id));
      setEventos(eventos.filter((e) => e.id !== id));
      mostrarMensaje("🗑️ Cita eliminada correctamente.", "exito");
    } catch {
      mostrarMensaje("❌ Error al eliminar la cita.", "error");
    }
  };

  // 🔹 Filtro
  const citasFiltradas = eventos.filter((evento) => {
    const coincideTexto = evento.texto
      ?.toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideFiltro =
      filtro === "todas"
        ? true
        : filtro === "completadas"
        ? evento.completada
        : !evento.completada;

    return coincideTexto && coincideFiltro;
  });

  return (
    <div className="citas-container">
      <h2 className="titulo-citas">
        <FaCalendarAlt /> Mis Citas
      </h2>

      {/* 🔍 Filtros */}
      <div className="filtros">
        <div className="input-icono">
          <FaSearch className="icono-input" />
          <input
            type="text"
            placeholder="Buscar cita..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
        </select>
      </div>

      {/* 📝 Formulario */}
      <form className="form-cita" onSubmit={registrarCita}>
        <h3>
          <FaPlusCircle /> Registrar nueva cita
        </h3>
        <input
          type="text"
          placeholder="Título de la cita (Ej: Vacunación)"
          value={nuevaCita.texto}
          onChange={(e) => setNuevaCita({ ...nuevaCita, texto: e.target.value })}
        />
        <input
          type="date"
          value={nuevaCita.fecha}
          onChange={(e) => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
        />
        <input
          type="time"
          value={nuevaCita.hora}
          onChange={(e) => setNuevaCita({ ...nuevaCita, hora: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre de la mascota"
          value={nuevaCita.mascota}
          onChange={(e) =>
            setNuevaCita({ ...nuevaCita, mascota: e.target.value })
          }
        />
        <textarea
          placeholder="Descripción o recordatorio (opcional)"
          value={nuevaCita.descripcion}
          onChange={(e) =>
            setNuevaCita({ ...nuevaCita, descripcion: e.target.value })
          }
        ></textarea>
        <button type="submit" className="btn-registrar">
          <FaPlusCircle /> Guardar Cita
        </button>
      </form>

      {/* 📋 Lista */}
      {citasFiltradas.length === 0 ? (
        <p className="sin-citas">No hay citas registradas.</p>
      ) : (
        <div className="citas-lista">
          {citasFiltradas.map((evento) => (
            <div
              key={evento.id}
              className={`cita-card ${evento.completada ? "completada" : ""}`}
            >
              <div className="cita-info">
                <h3>{evento.texto}</h3>
                <p>
                  <FaCalendarAlt /> {evento.fecha} &nbsp; <FaClock />{" "}
                  {evento.hora}
                </p>
                <p>
                  <FaDog /> Mascota: <strong>{evento.mascota}</strong>
                </p>
                {evento.descripcion && (
                  <p className="descripcion">
                    <FaStickyNote /> {evento.descripcion}
                  </p>
                )}
              </div>
              <div className="cita-acciones">
                <button
                  className="btn-completar"
                  onClick={() =>
                    marcarCompletada(evento.id, evento.completada)
                  }
                >
                  <FaCheckCircle />{" "}
                  {evento.completada ? "Completada" : "Marcar completada"}
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarCita(evento.id)}
                >
                  <FaTrashAlt /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔔 Mensaje flotante */}
      {mensaje && (
        <div
          className={`mensaje-flotante ${
            mensaje.tipo === "exito" ? "exito" : "error"
          }`}
        >
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}

export default Citas;

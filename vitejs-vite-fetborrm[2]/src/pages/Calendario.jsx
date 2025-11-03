import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendario.css";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

function Calendario() {
  const [date, setDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarEventos = async () => {
    try {
      const q = query(collection(db, "eventos"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventos(data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const handleAddEvent = async () => {
    if (!nuevoEvento.trim()) return;

    const nuevo = {
      fecha: date.toDateString(),
      texto: nuevoEvento,
      completada: false,
    };

    try {
      await addDoc(collection(db, "eventos"), nuevo);
      setNuevoEvento("");
      setMostrarModal(false);
      cargarEventos();
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      cargarEventos();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  const eventosDelDia = eventos.filter(
    (e) => e.fecha === date.toDateString()
  );

  return (
    <div className="calendar-wrapper">
      {/* Panel izquierdo: calendario */}
      <div className="calendar-panel">
        <h2 className="calendar-title">Junio 2024</h2>
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
        />
      </div>

      {/* Panel derecho: lista de eventos */}
      <div className="events-panel">
        <h3 className="events-title">
          Eventos del {date.toLocaleDateString("es-ES")}
        </h3>

        {eventosDelDia.length === 0 ? (
          <p className="no-events">No hay eventos para este día.</p>
        ) : (
          <ul className="events-list">
            {eventosDelDia.map((e) => (
              <li key={e.id} className="event-card">
                <div className="event-info">
                  <strong>{e.texto}</strong>
                  <p>🐾 Evento veterinario / cuidado</p>
                </div>
                <div className="event-actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteEvent(e.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          className="btn-add"
          onClick={() => setMostrarModal(true)}
        >
          ➕ Agregar evento
        </button>
      </div>

      {/* Modal de agregar evento */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agregar nuevo evento</h3>
            <input
              type="text"
              value={nuevoEvento}
              onChange={(e) => setNuevoEvento(e.target.value)}
              placeholder="Ej: Vacuna Max"
            />
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button className="btn-save" onClick={handleAddEvent}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;

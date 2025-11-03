import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Sidebar from "../components/Sidebar";
import "../styles/Inicio.css";

function Inicio() {
  const [mascotas, setMascotas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const navigate = useNavigate();

  // 🔹 Escuchar mascotas en tiempo real desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mascotas"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMascotas(data);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Eliminar mascota
  const eliminarMascota = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta mascota?")) return;
    try {
      await deleteDoc(doc(db, "mascotas", id));
      if (seleccionada?.id === id) setSeleccionada(null);
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
    }
  };

  return (
    <div className="inicio-container">
      <Sidebar />
      <div className="inicio-content">
        <header className="inicio-header">
          <h1>¡Hola! 🐾</h1>
          <p>Estas son tus mascotas registradas</p>
        </header>

        <div className="mascotas-grid">
          {mascotas.length === 0 ? (
            <p className="sin-mascotas">No tienes mascotas registradas.</p>
          ) : (
            mascotas.map((m) => (
              <div
                key={m.id}
                className={`mascota-card ${
                  seleccionada?.id === m.id ? "expandida" : ""
                }`}
                onClick={() =>
                  setSeleccionada(seleccionada?.id === m.id ? null : m)
                }
              >
                {/* Tarjeta compacta */}
                <div className="mascota-header">
                  <img
                    src={m.imagenUrl || "https://placedog.net/200/200"}
                    alt={m.nombre}
                    className="mascota-img"
                  />
                  <h3>{m.nombre}</h3>
                  <p>{m.tipo || "-"}</p>
                </div>

                {/* Detalle expandido */}
                {seleccionada?.id === m.id && (
                  <div className="mascota-detalle">
                    <p><strong>Raza:</strong> {m.raza || "-"}</p>
                    <p><strong>Edad:</strong> {m.edad || "-"} años</p>
                    <p><strong>Peso:</strong> {m.peso || "-"} kg</p>
                    <p><strong>Sexo:</strong> {m.sexo || "-"}</p>
                    <p><strong>Vacunas:</strong> {m.vacunas || "No registradas"}</p>
                    <p><strong>Estado de salud:</strong> {m.salud || "-"}</p>
                    {m.descripcion && (
                      <p><strong>Descripción:</strong> {m.descripcion}</p>
                    )}
                    <div className="botones-mascota">
                      <button
                        className="btn-editar"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editar-mascota/${m.id}`);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarMascota(m.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button
          className="btn-registrar"
          onClick={() => navigate("/registrar-mascota")}
        >
          + Registrar nueva mascota
        </button>
      </div>
    </div>
  );
}

export default Inicio;

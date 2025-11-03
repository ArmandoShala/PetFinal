import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { FaPaw, FaPlus, FaTrashAlt, FaDog } from "react-icons/fa";
import "../styles/RegistrarMascota.css";

function Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [nueva, setNueva] = useState({
    nombre: "",
    edad: "",
    raza: "",
    imagenUrl: "",
  });

  useEffect(() => {
    const obtenerMascotas = async () => {
      const snapshot = await getDocs(collection(db, "mascotas"));
      setMascotas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    obtenerMascotas();
  }, []);

  const registrarMascota = async (e) => {
    e.preventDefault();
    const { nombre, edad, raza, imagenUrl } = nueva;
    if (!nombre || !edad || !raza || !imagenUrl) {
      setMensaje("⚠️ Completa todos los campos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "mascotas"), {
        nombre,
        edad,
        raza,
        imagenUrl,
        fechaRegistro: new Date().toISOString(),
      });
      setMascotas([...mascotas, { id: docRef.id, ...nueva }]);
      setMensaje("✅ Mascota registrada correctamente.");
      setNueva({ nombre: "", edad: "", raza: "", imagenUrl: "" });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar mascota.");
    }
  };

  const eliminarMascota = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta mascota?")) return;
    try {
      await deleteDoc(doc(db, "mascotas", id));
      setMascotas(mascotas.filter((m) => m.id !== id));
      setMensaje("🗑️ Mascota eliminada correctamente.");
      setSeleccionada(null);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al eliminar la mascota.");
    }
  };

  return (
    <div className="mascotas-container">
      {/* Lista de mascotas */}
      <div className="mascotas-lista">
        <h2><FaPaw style={{ marginRight: "0.5rem" }} /> Mis Mascotas</h2>

        {mascotas.length === 0 ? (
          <p className="vacio"><FaDog style={{ marginRight: "0.3rem" }}/>No hay mascotas registradas aún.</p>
        ) : (
          mascotas.map((m) => (
            <div
              key={m.id}
              className={`tarjeta-mascota ${seleccionada?.id === m.id ? "activa" : ""}`}
              onClick={() => setSeleccionada(m)}
            >
              <img src={m.imagenUrl} alt={m.nombre} />
              <div className="info">
                <h3>{m.nombre}</h3>
                <p>{m.raza}</p>
                <span>{m.edad} años</span>
              </div>
            </div>
          ))
        )}

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {/* Formulario de registro */}
        <form onSubmit={registrarMascota} className="registrar-form">
          <h3><FaPlus style={{ marginRight: "0.4rem" }}/> Registrar nueva mascota</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nueva.nombre}
            onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edad"
            value={nueva.edad}
            onChange={(e) => setNueva({ ...nueva, edad: e.target.value })}
          />
          <input
            type="text"
            placeholder="Raza o especie"
            value={nueva.raza}
            onChange={(e) => setNueva({ ...nueva, raza: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={nueva.imagenUrl}
            onChange={(e) => setNueva({ ...nueva, imagenUrl: e.target.value })}
          />
          <button type="submit" className="btn-registrar">
            Registrar
          </button>
        </form>
      </div>

    </div>
  );
}

export default Mascotas;

import React from 'react';
import "../styles/Consejos.css";

const consejosData = [
  {
    id: 1,
    titulo: "Alimentación balanceada",
    descripcion: "Ofrece a tu mascota comida de calidad y equilibrada según su edad y tamaño.",
  },
  {
    id: 2,
    titulo: "Ejercicio diario",
    descripcion: "Dedica al menos 30 minutos al día para paseos o juegos activos.",
  },
  {
    id: 3,
    titulo: "Visitas al veterinario",
    descripcion: "Realiza chequeos regulares para prevenir enfermedades y mantener vacunas al día.",
  },
  {
    id: 4,
    titulo: "Higiene y cuidado",
    descripcion: "Cepilla su pelo, corta uñas y limpia sus dientes regularmente.",
  },
  {
    id: 5,
    titulo: "Atención y cariño",
    descripcion: "Dedica tiempo de calidad, acaricia y juega con tu mascota para su bienestar emocional.",
  },
];

function Consejos() {
  return (
    <div className="consejos-container">
      <h2 className="consejos-title">💡 Consejos para tus mascotas</h2>
      <div className="consejos-grid">
        {consejosData.map((consejo) => (
          <div key={consejo.id} className="consejo-card">
            <h3>{consejo.titulo}</h3>
            <p>{consejo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consejos;

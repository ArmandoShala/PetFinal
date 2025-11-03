import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserContext } from '../context/UserContext';
import {
  FaHome,
  FaUser,
  FaDog,
  FaCalendarAlt,
  FaClipboardList,
  FaStethoscope,
  FaSignOutAlt,
  FaPlus
} from 'react-icons/fa';
import '../styles/Sidebar.css';
import logo from '../assets/Logosidebar.png'; 

function Sidebar() {
  const navigate = useNavigate();
  const { rol } = useContext(UserContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // Redirige al login
  };

  return (
    <div className="sidebar">
      {/* ===== LOGO ===== */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo PetCare" />
        <span>PetCare</span>
      </div>

      {/* ===== NAVEGACIÓN ===== */}
      <nav className="sidebar-nav">
        <Link to="/inicio"><FaHome /> Inicio</Link>
        <Link to="/perfil"><FaUser /> Perfil</Link>
        <Link to="/registrar-mascota"><FaDog /> Registrar Mascota</Link>
        <Link to="/calendario"><FaCalendarAlt /> Calendario</Link>
        <Link to="/citas"><FaClipboardList /> Citas</Link>
        <Link to="/veterinariosunificados"><FaStethoscope /> Veterinarios</Link>

        {rol === 'admin' && (
          <Link to="/veterinariosunificados/agregar"><FaPlus /> Agregar Veterinario</Link>
        )}
      </nav>

      {/* ===== CERRAR SESIÓN ===== */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import Perfil from './pages/Perfil';
import Citas from './pages/Citas';
import Calendario from './pages/Calendario';
import DashboardLayout from './layouts/DashboardLayout';
import RegistrarMascota from './pages/RegistrarMascota';
import EditarMascota from './pages/EditarMascota';
import VeterinariosUnificados from './pages/VeterinariosUnificados';
import AgregarVeterinario from './pages/AgregarVeterinario';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/registrar-mascota" element={<RegistrarMascota />} />
          <Route path="/editar-mascota/:id" element={<EditarMascota />} />

          {/* Veterinarios */}
          <Route path="/veterinariosunificados" element={<VeterinariosUnificados />} />
          <Route path="/veterinariosunificados/agregar" element={<AgregarVeterinario />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

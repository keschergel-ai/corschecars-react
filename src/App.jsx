import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehiculos from './pages/Vehiculos';
import Ofertas from './pages/Ofertas';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Noticias from './pages/Noticias';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

export default function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('corschecars_carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('corschecars_usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    localStorage.setItem('corschecars_carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('corschecars_usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('corschecars_usuario');
    }
  }, [usuario]);

  const agregarAlCarrito = (vehiculo) => {
    setCarrito(prev => [...prev, vehiculo]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const handleLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <Router>
      <Navbar 
        cantidadCarrito={carrito.length} 
        usuario={usuario} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route path="/" element={<Home onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/vehiculos" element={<Vehiculos onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/ofertas" element={<Ofertas onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} onVaciarCarrito={vaciarCarrito} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} usuario={usuario} onVaciarCarrito={vaciarCarrito} />} />
        <Route path="/admin" element={<Admin usuario={usuario} onLogout={handleLogout} />} />
      </Routes>
      <footer>
        <p>© 2026 CorscheCars (CRSC). Todos los derechos reservados.</p>
      </footer>
    </Router>
  );
}

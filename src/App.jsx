import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehiculos from './pages/Vehiculos';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';

export default function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (vehiculo) => {
    setCarrito([...carrito, vehiculo]);
  };

  return (
    <Router>
      <Navbar cantidadCarrito={carrito.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculos" element={<Vehiculos onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} />} />
      </Routes>
    </Router>
  );
}
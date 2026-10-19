import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cantidadCarrito = 0 }) {
  return (
    <header>
      <nav>
        <Link to="/" className="logo-crsc">
          <span className="shield-icon">CRSC</span>
          <span>CorscheCars</span>
        </Link>
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/vehiculos">Vehiculos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/login">Ingresar</Link>
          <Link to="/carrito" className="btn-rojo" style={{ marginLeft: '1rem' }}>
            Carrito ({cantidadCarrito})
          </Link>
        </div>
      </nav>
    </header>
  );
}
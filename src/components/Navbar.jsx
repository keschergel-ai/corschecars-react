import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cantidadCarrito = 0, usuario, onLogout }) {
  const esAdmin = usuario?.rol === 'admin';

  return (
    <header>
      <Link to="/" className="logo-container" title="CorscheCars Inicio">
        <svg className="insignia" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 100,0 50,230" fill="#FFFFFF" />
          <rect x="42" y="0" width="16" height="200" fill="#1C488C" />
          <rect x="15" y="45" width="70" height="16" fill="#1C488C" />
          <text x="25" y="38" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#DA291C" textAnchor="middle">C</text>
          <text x="75" y="38" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#DA291C" textAnchor="middle">R</text>
          <text x="25" y="88" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#DA291C" textAnchor="middle">S</text>
          <text x="75" y="88" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#DA291C" textAnchor="middle">C</text>
        </svg>
      </Link>

      <nav>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/vehiculos">Vehiculos</Link>
          <Link to="/ofertas" style={{ color: '#ffc107' }}>Ofertas</Link>
          <Link to="/noticias">Noticias</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          
          {/* Botón especial visible solo para administradores */}
          {esAdmin && (
            <Link to="/admin" style={{ background: '#0d6efd', color: '#ffffff', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
              ⚙️ PANEL ADMIN
            </Link>
          )}

          {usuario ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: esAdmin ? '#ffc107' : '#9ec5fe', fontWeight: 'bold', fontSize: '0.85rem' }}>
                {esAdmin ? '👑 Admin' : `👤 ${usuario.nombre}`}
              </span>
              <button onClick={onLogout} style={{ background: 'transparent', border: '1px solid #ffffff', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                SALIR
              </button>
            </div>
          ) : (
            <Link to="/login">Ingresar</Link>
          )}

          <Link to="/carrito" className="btn-rojo">
            Carrito ({cantidadCarrito})
          </Link>
        </div>
      </nav>
    </header>
  );
}

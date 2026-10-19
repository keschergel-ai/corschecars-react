import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <section className="hero-banner">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1>LA GLORIA ETERNA SOBRE RUEDAS</h1>
          <p>Explora nuestro inventario de elite y vehiculos seminuevos certificados con el respaldo CRSC.</p>
          <Link to="/vehiculos" className="btn-outline">
            VER INVENTARIO
          </Link>
        </div>
      </section>

      <div className="container">
        <div className="card-box">
          <h3>BUSCADOR RAPIDO</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Ej. Suzuki, Toyota, Honda..." 
              style={{ flex: 1, padding: '0.6rem', border: '1px solid #ccc', borderRadius: '3px' }}
            />
            <Link to="/vehiculos" className="btn-rojo">BUSCAR</Link>
          </div>
        </div>

        <div className="card-box">
          <h3>CATEGORIAS DESTACADAS</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#e9ecef', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}>SUVs</span>
            <span style={{ background: '#e9ecef', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}>Deportivos</span>
            <span style={{ background: '#e9ecef', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}>Camionetas</span>
            <span style={{ background: '#e9ecef', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}>Seminuevos</span>
          </div>
        </div>
      </div>
    </main>
  );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VehiculoCard from '../components/VehiculoCard';
import { obtenerVehiculos } from '../data/vehiculosData';

export default function Home({ onAgregarCarrito }) {
  const [vehiculos] = useState(obtenerVehiculos());
  const [categoriaSel, setCategoriaSel] = useState('Todos los Vehículos');
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    if (categoriaSel !== 'Todos los Vehículos') {
      navigate(`/vehiculos?cat=${encodeURIComponent(categoriaSel)}`);
    } else {
      navigate('/vehiculos');
    }
  };

  return (
    <main>
      <section className="hero-banner">
        <div>
          <h1>LA GLORIA ETERNA SOBRE RUEDAS</h1>
          <p>Explora nuestro inventario de elite y vehiculos seminuevos certificados con el respaldo CRSC.</p>
          <Link to="/vehiculos" className="btn-outline">
            VER INVENTARIO
          </Link>
        </div>
      </section>

      <div className="container">
        {/* Buscador Rapido */}
        <div className="card-box">
          <h3>BUSCADOR RAPIDO</h3>
          <form className="buscador-form" onSubmit={handleBuscar}>
            <select 
              className="buscador-select"
              value={categoriaSel}
              onChange={(e) => setCategoriaSel(e.target.value)}
            >
              <option value="Todos los Vehículos">Todos los Vehículos</option>
              <option value="SUVs">SUVs</option>
              <option value="Deportivos">Deportivos</option>
              <option value="Camionetas">Camionetas</option>
              <option value="Seminuevos">Seminuevos</option>
            </select>
            <input 
              type="text" 
              className="buscador-input" 
              placeholder="Ej. Suzuki, Toyota, Honda..." 
            />
            <button type="submit" className="btn-rojo">BUSCAR</button>
          </form>
        </div>

        {/* Categorias Destacadas con enlaces filtrados directos */}
        <div className="card-box">
          <h3>CATEGORIAS DESTACADAS</h3>
          <div className="categorias-list">
            <Link to="/vehiculos?cat=SUVs" className="categoria-tag">SUVs</Link>
            <Link to="/vehiculos?cat=Deportivos" className="categoria-tag">Deportivos</Link>
            <Link to="/vehiculos?cat=Camionetas" className="categoria-tag">Camionetas</Link>
            <Link to="/vehiculos?cat=Seminuevos" className="categoria-tag">Seminuevos</Link>
          </div>
        </div>

        {/* Inventario Destacado */}
        <div className="card-box">
          <h3>INVENTARIO DESTACADO</h3>
          <div className="grid-vehiculos">
            {vehiculos.map((v) => (
              <VehiculoCard 
                key={v.id} 
                vehiculo={v} 
                onAgregarCarrito={onAgregarCarrito} 
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VehiculoCard from '../components/VehiculoCard';
import { obtenerVehiculos } from '../data/vehiculosData';

export default function Vehiculos({ onAgregarCarrito }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todosVehiculos] = useState(obtenerVehiculos());

  // Lee el parámetro 'cat' de la URL (ej: /vehiculos?cat=SUVs)
  const categoriaFiltro = searchParams.get('cat') || 'Todas';

  const cambiarCategoria = (cat) => {
    if (cat === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const vehiculosFiltrados = categoriaFiltro === 'Todas' 
    ? todosVehiculos 
    : todosVehiculos.filter(v => v.categoria.toLowerCase() === categoriaFiltro.toLowerCase());

  return (
    <main className="container">
      <div className="card-box">
        <h2>Catálogo de Vehículos</h2>
        
        {/* Filtros de Categoría */}
        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['Todas', 'SUVs', 'Deportivos', 'Camionetas', 'Seminuevos'].map((cat) => (
            <button
              key={cat}
              onClick={() => cambiarCategoria(cat)}
              className={categoriaFiltro.toLowerCase() === cat.toLowerCase() ? 'btn-rojo' : 'categoria-tag'}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Vehículos */}
        <div className="grid-vehiculos">
          {vehiculosFiltrados.length > 0 ? (
            vehiculosFiltrados.map((v) => (
              <VehiculoCard 
                key={v.id} 
                vehiculo={v} 
                onAgregarCarrito={onAgregarCarrito} 
              />
            ))
          ) : (
            <p style={{ padding: '1rem 0' }}>No se encontraron vehículos en esta categoría.</p>
          )}
        </div>
      </div>
    </main>
  );
}

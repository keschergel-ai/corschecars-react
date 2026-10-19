import React from 'react';
import VehiculoCard from '../components/VehiculoCard';
import { obtenerVehiculos } from '../data/vehiculosData';

export default function Ofertas({ onAgregarCarrito }) {
  const vehiculos = obtenerVehiculos();
  // Aplicamos un descuento promocional simulado a los vehículos
  const ofertas = vehiculos.map(v => ({
    ...v,
    precioOriginal: Math.round(v.precio * 1.15),
    esOferta: true
  }));

  return (
    <main className="container" style={{ marginTop: '2rem' }}>
      <div className="card-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>🔥 Ofertas Especiales y Bonos CRSC</h2>
          <span style={{ background: '#DA291C', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            DESCUENTOS POR TIEMPO LIMITADO
          </span>
        </div>
        <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
          Aprovecha los bonos de financiamiento y precios especiales en unidades seleccionadas.
        </p>

        <div className="grid-vehiculos">
          {ofertas.map((v) => (
            <VehiculoCard key={v.id} vehiculo={v} onAgregarCarrito={onAgregarCarrito} />
          ))}
        </div>
      </div>
    </main>
  );
}
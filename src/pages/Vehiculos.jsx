import React, { useState } from 'react';
import VehiculoCard from '../components/VehiculoCard';
import { obtenerVehiculos } from '../data/vehiculosData';

export default function Vehiculos({ onAgregarCarrito }) {
  const [vehiculos] = useState(obtenerVehiculos());

  return (
    <main className="container">
      <h2>Catalogo de Vehiculos</h2>
      <div className="grid-vehiculos">
        {vehiculos.map((v) => (
          <VehiculoCard 
            key={v.id} 
            vehiculo={v} 
            onAgregarCarrito={onAgregarCarrito} 
          />
        ))}
      </div>
    </main>
  );
}
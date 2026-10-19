import React from 'react';

export default function VehiculoCard({ vehiculo, onAgregarCarrito }) {
  if (!vehiculo) return null;

  return (
    <article className="card">
      <img src={vehiculo.imagen} alt={vehiculo.nombre} />
      <h3>{vehiculo.nombre}</h3>
      <span className="categoria">{vehiculo.categoria}</span>
      <p className="precio">${vehiculo.precio.toLocaleString('es-CL')}</p>
      {onAgregarCarrito && (
        <button 
          onClick={() => onAgregarCarrito(vehiculo)}
          className="btn btn-primary"
        >
          Anadir al Carrito
        </button>
      )}
    </article>
  );
}
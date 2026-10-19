import React from 'react';

export default function VehiculoCard({ vehiculo, onAgregarCarrito }) {
  if (!vehiculo) return null;

  return (
    <article className="vehiculo-card">
      <img src={vehiculo.imagen} alt={vehiculo.nombre} />
      <div className="vehiculo-info">
        <h4>{vehiculo.nombre}</h4>
        <span className="vehiculo-categoria">{vehiculo.categoria}</span>
        <p className="vehiculo-precio">${vehiculo.precio.toLocaleString('es-CL')}</p>
        
        {onAgregarCarrito && (
          <button 
            onClick={() => onAgregarCarrito(vehiculo)}
            className="btn-rojo"
            style={{ width: '100%', marginTop: 'auto' }}
          >
            Añadir al Carrito
          </button>
        )}
      </div>
    </article>
  );
}

import React from 'react';

export default function Carrito({ carrito }) {
  const total = carrito.reduce((suma, item) => suma + item.precio, 0);

  return (
    <main className="container">
      <h2>Carrito de Compras</h2>
      <br />
      {carrito.length === 0 ? (
        <p>El carrito esta vacio.</p>
      ) : (
        <div className="form-box">
          <ul>
            {carrito.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {item.nombre} - <strong>${item.precio.toLocaleString('es-CL')}</strong>
              </li>
            ))}
          </ul>
          <hr style={{ margin: '1rem 0' }} />
          <h3>Total: ${total.toLocaleString('es-CL')}</h3>
        </div>
      )}
    </main>
  );
}
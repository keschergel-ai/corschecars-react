import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Carrito({ carrito = [], setCarrito, onVaciarCarrito }) {
  const navigate = useNavigate();

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCant = (item.cantidad || 1) + delta;
        return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : item;
      }
      return item;
    }));
  };

  const eliminarItem = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);

  return (
    <main className="container">
      <div className="card-box" style={{ marginTop: '2rem' }}>
        <h2>Carrito de Compras</h2>
        <p style={{ color: '#6c757d', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Gestión de productos agregados al carrito de compras con persistencia simulada.
        </p>

        {carrito.length === 0 ? (
          <div style={{ padding: '2rem 0', textAlign: 'center' }}>
            <p>Tu carrito de compras está vacío.</p>
            <Link to="/vehiculos" className="btn-rojo" style={{ marginTop: '1rem' }}>
              VER CATALOGO DE VEHICULOS
            </Link>
          </div>
        ) : (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1C488C', textAlign: 'left' }}>
                  <th style={{ padding: '0.8rem' }}>Imagen</th>
                  <th style={{ padding: '0.8rem' }}>Nombre</th>
                  <th style={{ padding: '0.8rem' }}>Precio</th>
                  <th style={{ padding: '0.8rem' }}>Cantidad</th>
                  <th style={{ padding: '0.8rem' }}>Subtotal</th>
                  <th style={{ padding: '0.8rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => {
                  const cant = item.cantidad || 1;
                  const subtotal = item.precio * cant;
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '0.8rem' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '3px' }} />
                      </td>
                      <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{item.nombre}</td>
                      <td style={{ padding: '0.8rem' }}>${item.precio.toLocaleString('es-CL')}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button onClick={() => cambiarCantidad(item.id, -1)} style={{ padding: '0.2rem 0.5rem', cursor: 'pointer' }}>-</button>
                          <span>{cant}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} style={{ padding: '0.2rem 0.5rem', cursor: 'pointer' }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>${subtotal.toLocaleString('es-CL')}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <button onClick={() => eliminarItem(item.id)} style={{ background: '#DA291C', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1C488C' }}>${total.toLocaleString('es-CL')}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={onVaciarCarrito} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
                Vaciar Carrito
              </button>
              <button onClick={() => navigate('/checkout')} className="btn-rojo" style={{ padding: '0.8rem 2rem' }}>
                IR AL CHECKOUT (PASO DE PAGO)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

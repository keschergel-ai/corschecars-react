import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ carrito = [], usuario, onVaciarCarrito }) {
  const navigate = useNavigate();
  const [estadoPago, setEstadoPago] = useState('formulario'); // 'formulario' | 'exito' | 'error'
  const [nroOrden, setNroOrden] = useState('');

  // Formulario de envío
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: 'Av. Las Condes 12345',
    depto: 'Depto 402',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Las Condes',
    indicaciones: 'Entregar en conserjería en horario de oficina.'
  });

  // Auto-completar datos si el usuario inició sesión (Requisito Nota Figura 6)
  useEffect(() => {
    if (usuario) {
      const partesNombre = usuario.nombre.split(' ');
      setFormData(prev => ({
        ...prev,
        nombre: partesNombre[0] || 'Cliente',
        apellidos: partesNombre[1] || 'CRSC',
        correo: usuario.correo || `${partesNombre[0].toLowerCase()}@corschecars.cl`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        nombre: 'Pedro',
        apellidos: 'González',
        correo: 'pedro.gonzalez@example.com'
      }));
    }
  }, [usuario]);

  const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);

  const handlePagarExito = (e) => {
    e.preventDefault();
    const ordenGen = 'ORDER' + Math.floor(10000000 + Math.random() * 90000000);
    setNroOrden(ordenGen);
    setEstadoPago('exito');
    onVaciarCarrito();
  };

  const handlePagarFallo = () => {
    const ordenGen = 'ORDER' + Math.floor(10000000 + Math.random() * 90000000);
    setNroOrden(ordenGen);
    setEstadoPago('error');
  };

  const handleImprimirBoleta = () => {
    window.print();
  };

  if (carrito.length === 0 && estadoPago === 'formulario') {
    return (
      <main className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div className="card-box">
          <h2>No hay productos para procesar el pago</h2>
          <button onClick={() => navigate('/vehiculos')} className="btn-rojo" style={{ marginTop: '1rem' }}>
            VOLVER AL CATALOGO
          </button>
        </div>
      </main>
    );
  }

  // VISTA 1: COMPRA EXITOSA (Figura 7)
  if (estadoPago === 'exito') {
    return (
      <main className="container" style={{ marginTop: '2rem' }}>
        <div className="card-box" style={{ borderLeftColor: '#28a745' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#28a745', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✓ Se ha realizado la compra. nro #{nroOrden}
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>Código orden: {nroOrden}</span>
          </div>

          <p style={{ color: '#6c757d', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Resumen de la orden procesada exitosamente.
          </p>

          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <h4>Datos del Cliente y Entrega:</h4>
            <p><strong>Cliente:</strong> {formData.nombre} {formData.apellidos} ({formData.correo})</p>
            <p><strong>Dirección:</strong> {formData.calle}, {formData.depto}, {formData.comuna}, {formData.region}</p>
            <p><strong>Indicaciones:</strong> {formData.indicaciones}</p>
          </div>

          <div style={{ textAlign: 'center', background: '#e8f5e9', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#28a745' }}>Total pagado: ${total.toLocaleString('es-CL')}</h3>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleImprimirBoleta} className="btn-rojo" style={{ background: '#DA291C' }}>
              Imprimir boleta en PDF
            </button>
            <button onClick={() => alert('Boleta enviada al correo registrado.')} className="btn-rojo" style={{ background: '#28a745' }}>
              Enviar boleta por email
            </button>
            <button onClick={() => navigate('/')} style={{ background: '#1C488C', color: '#fff', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </main>
    );
  }

  // VISTA 2: PAGO FALLIDO (Figura 8)
  if (estadoPago === 'error') {
    return (
      <main className="container" style={{ marginTop: '2rem' }}>
        <div className="card-box" style={{ borderLeftColor: '#DA291C', textAlign: 'center' }}>
          <h2 style={{ color: '#DA291C', marginBottom: '1rem' }}>
            ❌ No se pudo realizar el pago. nro #{nroOrden}
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
            Ocurrió un inconveniente al procesar la transacción bancaria.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setEstadoPago('formulario')} className="btn-rojo" style={{ background: '#28a745' }}>
              VOLVER A REALIZAR EL PAGO
            </button>
            <button onClick={() => navigate('/carrito')} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
              Volver al Carrito
            </button>
          </div>
        </div>
      </main>
    );
  }

  // VISTA 3: FORMULARIO CHECKOUT (Figura 6)
  return (
    <main className="container" style={{ marginTop: '2rem' }}>
      <div className="card-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Carrito de compra - Checkout</h2>
          <span style={{ background: '#1C488C', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '3px', fontWeight: 'bold' }}>
            Total a pagar: ${total.toLocaleString('es-CL')}
          </span>
        </div>

        <form onSubmit={handlePagarExito}>
          <h3 style={{ fontSize: '1.1rem', color: '#1C488C', marginBottom: '1rem' }}>Información del cliente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Nombre*</label>
              <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Apellidos*</label>
              <input type="text" value={formData.apellidos} onChange={(e) => setFormData({...formData, apellidos: e.target.value})} required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Correo*</label>
            <input type="email" value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})} required />
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#1C488C', marginBottom: '1rem' }}>Dirección de entrega de los productos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Calle*</label>
              <input type="text" value={formData.calle} onChange={(e) => setFormData({...formData, calle: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Departamento (opcional)</label>
              <input type="text" value={formData.depto} onChange={(e) => setFormData({...formData, depto: e.target.value})} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Región*</label>
              <select className="buscador-select" style={{ width: '100%' }} value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})}>
                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                <option value="Valparaíso">Región de Valparaíso</option>
                <option value="Bío Bío">Región del Bío Bío</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comuna*</label>
              <select className="buscador-select" style={{ width: '100%' }} value={formData.comuna} onChange={(e) => setFormData({...formData, comuna: e.target.value})}>
                <option value="Las Condes">Las Condes</option>
                <option value="Cerrillos">Cerrillos</option>
                <option value="Santiago Centro">Santiago Centro</option>
                <option value="Providencia">Providencia</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Indicaciones para la entrega (opcional)</label>
            <textarea rows="3" value={formData.indicaciones} onChange={(e) => setFormData({...formData, indicaciones: e.target.value})} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={handlePagarFallo} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
              Simular fallo de pago
            </button>
            <button type="submit" className="btn-rojo" style={{ background: '#28a745', padding: '0.8rem 2rem' }}>
              Pagar ahora ${total.toLocaleString('es-CL')}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
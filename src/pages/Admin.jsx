import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { obtenerVehiculos, agregarVehiculo, eliminarVehiculo } from '../data/vehiculosData';

export default function Admin({ usuario, onLogout }) {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState('dashboard');
  const [vehiculos, setVehiculos] = useState(obtenerVehiculos());

  const [nuevoForm, setNuevoForm] = useState({
    nombre: '',
    precio: '',
    categoria: 'SUVs',
    imagen: '',
    descripcion: ''
  });

  // PROTECCIÓN DE RUTA: Si no es Admin, bloquea la vista
  if (usuario?.rol !== 'admin') {
    return (
      <main className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div className="card-box" style={{ borderLeftColor: '#DA291C', padding: '2.5rem' }}>
          <h2 style={{ color: '#DA291C', marginBottom: '1rem' }}>⛔ Acceso Restringido</h2>
          <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
            Esta sección es exclusiva para administradores del sistema CorscheCars.
          </p>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Por favor, inicia sesión con el correo <strong>admin@corschecars.cl</strong> y clave <strong>123</strong>.
          </p>
          <Link to="/login" className="btn-rojo" style={{ padding: '0.8rem 2rem' }}>
            IR A INICIAR SESIÓN COMO ADMIN
          </Link>
        </div>
      </main>
    );
  }

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoForm.nombre || !nuevoForm.precio) return;
    agregarVehiculo({
      nombre: nuevoForm.nombre,
      precio: Number(nuevoForm.precio),
      categoria: nuevoForm.categoria,
      imagen: nuevoForm.imagen || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600',
      descripcion: nuevoForm.descripcion || 'Vehículo incorporado desde el panel de administración.'
    });
    setVehiculos(obtenerVehiculos());
    setNuevoForm({ nombre: '', precio: '', categoria: 'SUVs', imagen: '', descripcion: '' });
    alert('✅ Vehículo agregado al catálogo en tiempo real.');
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este vehículo de la base de datos?')) {
      eliminarVehiculo(id);
      setVehiculos(obtenerVehiculos());
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '88vh', backgroundColor: '#f4f6f9' }}>
      {/* Sidebar Lateral Exclusivo Admin */}
      <aside style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e0e0e0', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ background: '#0d6efd', color: '#fff', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
            ⚙️ PANEL ADMINISTRATIVO
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button onClick={() => setSeccion('dashboard')} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', background: seccion === 'dashboard' ? '#1C488C' : 'transparent', color: seccion === 'dashboard' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>
              📊 Dashboard
            </button>
            <button onClick={() => setSeccion('productos')} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', background: seccion === 'productos' ? '#1C488C' : 'transparent', color: seccion === 'productos' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>
              📦 Productos (CRUD)
            </button>
            <button onClick={() => setSeccion('ordenes')} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', background: 'transparent', color: '#333', cursor: 'pointer' }}>
              🛒 Órdenes
            </button>
            <button onClick={() => setSeccion('usuarios')} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', background: 'transparent', color: '#333', cursor: 'pointer' }}>
              👥 Usuarios
            </button>
            <button onClick={() => setSeccion('reportes')} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', background: 'transparent', color: '#333', cursor: 'pointer' }}>
              📈 Reportes
            </button>
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button onClick={() => navigate('/')} style={{ background: '#212529', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
            🏪 Ver Vista Tienda
          </button>
          <button onClick={onLogout} style={{ background: '#DA291C', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
            🚪 Cerrar Sesión Admin
          </button>
        </div>
      </aside>

      {/* Contenido Principal Dashboard */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#1C488C', margin: 0 }}>Dashboard del Sistema</h2>
            <p style={{ color: '#6c757d', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>Resumen operativo de CorscheCars (CRSC)</p>
          </div>
          <span style={{ background: '#e7f1ff', color: '#0d6efd', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            Sesión activa: admin@corschecars.cl
          </span>
        </div>

        {seccion === 'dashboard' && (
          <>
            {/* Tarjetas Métricas Superiores (Figura 9) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#0d6efd', color: '#fff', padding: '1.2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '0.9rem' }}>Compras Realizadas</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.4rem 0' }}>1,234</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Probabilidad de aumento: 20%</div>
              </div>
              <div style={{ background: '#198754', color: '#fff', padding: '1.2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '0.9rem' }}>Productos en Catálogo</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.4rem 0' }}>{vehiculos.length}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Inventario actual activo</div>
              </div>
              <div style={{ background: '#ffc107', color: '#000', padding: '1.2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '0.9rem' }}>Usuarios Registrados</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.4rem 0' }}>890</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Nuevos usuarios este mes: 120</div>
              </div>
            </div>

            {/* Módulos de Acceso Directo (Figura 9) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { titulo: 'Dashboard', desc: 'Visión general de todas las métricas y estadísticas clave del sistema.', ic: '📊' },
                { titulo: 'Órdenes', desc: 'Gestión y seguimiento de todas las órdenes de compra realizadas.', ic: '🛒' },
                { titulo: 'Productos', desc: 'Administrar inventario y detalles de los productos disponibles.', ic: '📦', accion: () => setSeccion('productos') },
                { titulo: 'Categorías', desc: 'Organizar productos en categorías para facilitar su navegación.', ic: '🏷️' },
                { titulo: 'Usuarios', desc: 'Gestión de cuentas de usuario y sus roles dentro del sistema.', ic: '👥' },
                { titulo: 'Reportes', desc: 'Generación de informes detallados sobre las operaciones del sistema.', ic: '📈' },
                { titulo: 'Perfil', desc: 'Administración de la información personal y configuraciones de cuenta.', ic: '👤' },
                { titulo: 'Tienda', desc: 'Visualiza la tienda en tiempo real desde la perspectiva del cliente.', ic: '🏪', accion: () => navigate('/') }
              ].map((m, idx) => (
                <div key={idx} onClick={m.accion} style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e0e0e0', cursor: m.accion ? 'pointer' : 'default', transition: 'transform 0.2s' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{m.ic}</div>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: '#1C488C' }}>{m.titulo}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#6c757d' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {seccion === 'productos' && (
          <div>
            <div className="card-box" style={{ marginBottom: '2rem' }}>
              <h3>Gestión de Productos - Agregar Vehículo (CREATE)</h3>
              <form onSubmit={handleAgregar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem' }}>Nombre Modelo*</label>
                  <input type="text" value={nuevoForm.nombre} onChange={(e) => setNuevoForm({...nuevoForm, nombre: e.target.value})} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem' }}>Precio (CLP)*</label>
                  <input type="number" value={nuevoForm.precio} onChange={(e) => setNuevoForm({...nuevoForm, precio: e.target.value})} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem' }}>Categoría</label>
                  <select value={nuevoForm.categoria} onChange={(e) => setNuevoForm({...nuevoForm, categoria: e.target.value})} style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}>
                    <option value="SUVs">SUVs</option>
                    <option value="Deportivos">Deportivos</option>
                    <option value="Camionetas">Camionetas</option>
                    <option value="Seminuevos">Seminuevos</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem' }}>URL Imagen</label>
                  <input type="text" value={nuevoForm.imagen} onChange={(e) => setNuevoForm({...nuevoForm, imagen: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <button type="submit" className="btn-rojo" style={{ background: '#198754' }}>
                    + GUARDAR EN BASE DE DATOS
                  </button>
                </div>
              </form>
            </div>

            <div className="card-box">
              <h3>Inventario en Base de Datos (READ / DELETE)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1C488C', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem' }}>ID</th>
                    <th style={{ padding: '0.6rem' }}>Nombre</th>
                    <th style={{ padding: '0.6rem' }}>Categoría</th>
                    <th style={{ padding: '0.6rem' }}>Precio</th>
                    <th style={{ padding: '0.6rem' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.map(v => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.6rem' }}>{v.id}</td>
                      <td style={{ padding: '0.6rem', fontWeight: 'bold' }}>{v.nombre}</td>
                      <td style={{ padding: '0.6rem' }}>{v.categoria}</td>
                      <td style={{ padding: '0.6rem' }}>${v.precio.toLocaleString('es-CL')}</td>
                      <td style={{ padding: '0.6rem' }}>
                        <button onClick={() => handleEliminar(v.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
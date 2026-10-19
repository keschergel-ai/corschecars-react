import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correo.trim() === '' || clave.trim() === '') {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    // Validación explícita de credenciales de Administrador
    if ((correo.toLowerCase() === 'admin@corschecars.cl' || correo.toLowerCase() === 'admin@duocuc.cl') && clave === '123') {
      const usuarioAdmin = { 
        nombre: 'Administrador CRSC', 
        correo: 'admin@corschecars.cl', 
        rol: 'admin' 
      };
      onLogin(usuarioAdmin);
      navigate('/admin'); // Redirección directa al Panel Administrativo
    } else {
      // Usuario cliente normal
      const usuarioNormal = { 
        nombre: correo.split('@')[0], 
        correo, 
        rol: 'cliente' 
      };
      onLogin(usuarioNormal);
      navigate('/'); // Redirección a la Tienda
    }
  };

  return (
    <main className="container" style={{ maxWidth: '480px', marginTop: '3rem' }}>
      <div className="card-box">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#1C488C' }}>Iniciar Sesión</h2>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6c757d', marginBottom: '1.5rem' }}>
          Accede a tu cuenta de usuario o administra la plataforma.
        </p>

        {/* Tarjeta Informativa de Credenciales para la Evaluación */}
        <div style={{ background: '#e7f1ff', borderLeft: '4px solid #0d6efd', padding: '0.8rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <strong>🔑 Credenciales de Prueba:</strong>
          <ul style={{ margin: '0.4rem 0 0 1.2rem', padding: 0 }}>
            <li><strong>Admin:</strong> <code>admin@corschecars.cl</code> | Clave: <code>123</code></li>
            <li><strong>Cliente:</strong> Cualesquiera otros datos (Ej: <code>cliente@duoc.cl</code> | Clave: <code>123</code>)</li>
          </ul>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#842029', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico*</label>
            <input 
              type="email" 
              placeholder="admin@corschecars.cl" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Contraseña*</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-rojo" style={{ width: '100%', padding: '0.8rem' }}>
            INGRESAR A LA PLATAFORMA
          </button>
        </form>
      </div>
    </main>
  );
}
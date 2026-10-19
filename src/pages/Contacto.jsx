import React, { useState } from 'react';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    if (!nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (!correo.trim() || !correo.includes('@')) err.correo = 'Ingrese un correo electrónico válido';
    if (!mensaje.trim()) err.mensaje = 'El mensaje no puede estar vacío';

    setErrores(err);
    if (Object.keys(err).length === 0) {
      setExito(true);
      setNombre('');
      setCorreo('');
      setMensaje('');
    }
  };

  return (
    <main className="container">
      <div className="card-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Contáctanos</h2>
        
        {exito && (
          <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '4px', marginBottom: '1.2rem', fontWeight: 'bold' }}>
            ✓ ¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input 
              type="text" 
              className={errores.nombre ? 'error' : ''}
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <p className="msg-error">{errores.nombre}</p>}
          </div>

          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input 
              type="email" 
              className={errores.correo ? 'error' : ''}
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errores.correo && <p className="msg-error">{errores.correo}</p>}
          </div>

          <div className="form-group">
            <label>Mensaje:</label>
            <textarea 
              rows="4"
              className={errores.mensaje ? 'error' : ''}
              placeholder="Escribe tu consulta o requerimiento..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>
            {errores.mensaje && <p className="msg-error">{errores.mensaje}</p>}
          </div>

          <button type="submit" className="btn-rojo" style={{ width: '100%' }}>
            ENVIAR MENSAJE
          </button>
        </form>
      </div>
    </main>
  );
}

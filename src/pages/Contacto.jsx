import React, { useState } from 'react';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valido = true;

    if (nombre.trim() === '') {
      setErrorNombre('El nombre es obligatorio');
      valido = false;
    } else {
      setErrorNombre('');
    }

    if (email.trim() === '') {
      setErrorEmail('El correo es obligatorio');
      valido = false;
    } else if (!email.includes('@')) {
      setErrorEmail('Ingrese un correo valido');
      valido = false;
    } else {
      setErrorEmail('');
    }

    if (mensaje.trim() === '') {
      setErrorMensaje('El mensaje es obligatorio');
      valido = false;
    } else {
      setErrorMensaje('');
    }

    if (valido) {
      setEnviado(true);
      setNombre('');
      setEmail('');
      setMensaje('');
    }
  };

  return (
    <main className="container">
      <div className="card-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#1b4985', marginBottom: '1.5rem' }}>Contactanos</h2>

        {enviado ? (
          <p style={{ color: '#1b4985', fontWeight: 'bold' }}>
            ¡Mensaje enviado con exito! Nos comunicaremos contigo a la brevedad.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Completo:</label>
              <input 
                type="text" 
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={errorNombre ? 'error' : ''}
              />
              {errorNombre && <span className="msg-error">{errorNombre}</span>}
            </div>

            <div className="form-group">
              <label>Correo Electronico:</label>
              <input 
                type="email" 
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errorEmail ? 'error' : ''}
              />
              {errorEmail && <span className="msg-error">{errorEmail}</span>}
            </div>

            <div className="form-group">
              <label>Mensaje:</label>
              <textarea 
                rows="4" 
                placeholder="Escribe tu consulta..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className={errorMensaje ? 'error' : ''}
              ></textarea>
              {errorMensaje && <span className="msg-error">{errorMensaje}</span>}
            </div>

            <button type="submit" className="btn-azul">
              ENVIAR MENSAJE
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
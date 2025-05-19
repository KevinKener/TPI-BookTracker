import React, { useState } from 'react';
import Input from '../input/Input';
import './Register.css';
import { useNavigate } from 'react-router';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreUsuario: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlelogin = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', formData);
    // Enviar datos a la DB
  };

  return (
    <div className="main-register">
      <div className="register-inputs">
        <div>
          <div className="register-text">
            <h2>Regístrate ahora</h2>
            <p>Crea tu cuenta</p>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <Input
              placeholder="Nombre de usuario"
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
            />
            <Input
              placeholder="Confirmar contraseña"
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
            />
            <button type="submit" className="register-button">Registrarse</button>
          </form>
          <div className="login-text">
            <p>¿Ya tienes una cuenta?</p>
            <a href="" onClick={handlelogin}>
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
      <div className="register-image">
        <div className="register-image-text">
          <h3>Organiza tus lecturas</h3>
          <p>
            Manten un registro de tus lecturas y ayuda a tu <br /> memoria con
            BookTracker
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
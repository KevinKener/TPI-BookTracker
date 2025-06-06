import { useState } from 'react';
import { useNavigate } from 'react-router';
import { errorToast, successToast } from '../notifications/notifications.js';
import Input from '../input/Input';
import fetchRegister from './register.services.js';
import { useTranslate } from '../hooks/translation/UseTranslate';
import { validateEmail, validatePassword, validateString } from '../auth/auth.services.js';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const translate = useTranslate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nombreUsuario, email, contrasena, confirmarContrasena } = formData;

    if (contrasena !== confirmarContrasena) {
      errorToast('Las contraseñas no coinciden.');
      return;
    }

    if (!validateString(nombreUsuario, 3, 12)) {
      errorToast("El nombre de usuario debe tener entre 3 y 12 caracteres");
    }

    if (!validateEmail(email)) {
      errorToast("El mail ingresado es inválido");
    }

    if (!validatePassword(contrasena, 6, 12, true, true)) {
      errorToast("La contraseña debe tener entre 6 y 12 caracteres. Al menos 1 mayúscula y 1 número");
    }

    try {
      const res = await fetchRegister(
        nombreUsuario,
        email,
        contrasena
      )

      console.log('Datos del formulario:', formData);
      successToast("Cuenta registrada exitosamente.")
      navigate('/login');

    } catch (error) {
      console.error("Error al registrar :", error);
      // errorToast("Ha ocurrido un error en al registrar el usuario.");  
    }
  };

  return (
    <div className="main-register">
      <div className="register-inputs">
        <div>
          <div className="register-text">
            <h2>{translate("register_now")}</h2>
            <p>{translate("create_your_account")}</p>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <Input
              placeholder={translate("username")}
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
            />
            <Input
              placeholder={translate("email")}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              placeholder={translate("password")}
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
            />
            <Input
              placeholder={translate("confirm_password")}
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
            />
            <button type="submit" className="register-button">{translate("register")}</button>
          </form>
          <div className="login-text">
            <p>{translate("already_registered")}</p>
            <a href="" onClick={handlelogin}>
              {translate("login")}
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
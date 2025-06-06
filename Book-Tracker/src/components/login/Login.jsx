import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from '../hooks/translation/UseTranslate';
import { successToast, errorToast } from '../notifications/notifications.js';
import Input from '../input/Input';
import fetchLogin from './login.services.js';
import './Login.css';
import '../register/Register.css';
import { validateEmail, validatePassword } from '../auth/auth.services.js';

const Login = () => {
    const navigate = useNavigate();
    const translate = useTranslate();
    const { handleUserLogin } = useContext(AuthenticationContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = formData;

        if (!validateEmail(email) || !validatePassword(password, 6, 12, true, true)) {
            errorToast("Correo y/o contraseña incorrecto/s");
        }

        try {
            const data = await fetchLogin(formData.email, formData.password);
            handleUserLogin(data.token, data.username, data.id, data.role, data.img);
            successToast("Inicio de sesión existoso");
            navigate("/my-books");
        } catch (errors) {
            errorToast(errors || "Error desconocido al iniciar sesión")
        }
    }

    return (
        <div className='main-register'>
            <div className="login-image">
                <div className="login-image-text">
                    <h3>Tus libros a un click</h3>
                    <p>
                        Accede a tu biblioteca y gestiona tus<br />lecturas
                    </p>
                </div>
            </div>
            <div className="register-inputs">
                <div>
                    <div className="register-text">
                        <h2>{translate("login")}</h2>
                        <p>{translate("login_text")}</p>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
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
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit" className="register-button">{translate("login")}</button>
                    </form>
                    <div className="login-text">
                        <p>¿No tienes una cuenta?</p>
                        <a href="" onClick={handleRegister}>
                            Registrate
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
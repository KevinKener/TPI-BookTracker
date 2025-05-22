import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../services/auth.context'
import { useTranslate } from '../hooks/translation/UseTranslate'
import Input from '../input/Input'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const translate = useTranslate();
    const [errors, setErrors] = useState({ email: false, password: false });
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Datos del formulario:', formData);

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        })
            .then(res => res.json())
            .then(data => {
                handleUserLogin(data.token, data.username)
                navigate("/my-books")
            })
            .catch(errors => {
                console.log("Error al iniciar sesión", errors)
                return
            })

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
                        <p>ingresa tu cuenta</p>
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
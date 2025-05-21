import { useContext } from 'react'
import { Form, Row, Col, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../services/auth.context'
import { useTranslate } from '../hooks/translation/UseTranslate'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ email: false, password: false });

    const { handleUserLogin } = useContext(AuthenticationContext);
    const translate = useTranslate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
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
    <div className="login-page">
        <div className='login-box'>
            <h2>{translate("login")}</h2>
            <br />
            <Form className='login-form' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>{translate("email")}</FormLabel>
                            <FormControl type='email' 
                            value={email} 
                            onChange={(event)=>{setEmail(event.target.value)}}
                            ></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>{translate("password")}</FormLabel>
                            <FormControl type='password' 
                            value={password} 
                            onChange={(event)=>setPassword(event.target.value)}
                            ></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Button type='submit'>
                            {translate("login")}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}

export default Login
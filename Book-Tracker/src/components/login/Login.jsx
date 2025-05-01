import React from 'react'
import { Form, Row, Col, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = ({ setIsLogged }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(email && password){
            setIsLogged(true);
            navigate('/my-books');
            console.log(email)
            console.log(password)
        }
    }

  return (
    <div className="login-page">
        <div className='login-box'>
            <h2>Iniciar Sesión</h2>
            <br />
            <Form className='login-form' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Correo electrónico</FormLabel>
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
                            <FormLabel>Contraseña</FormLabel>
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
                            Iniciar sesión
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}

export default Login
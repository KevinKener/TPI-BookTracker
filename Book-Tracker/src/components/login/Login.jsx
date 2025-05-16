import React from 'react'
import { Form, Row, Col, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateString, validateEmail, validatePassword } from '../auth/auth.services'

const Login = ({ setIsLogged }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();


        if(!validatePassword(password, 1)){
            setErrors({...errors, password:true})
            errorToast('La contraseña es requerida')
            // passwordRef.current.focus()
            return;
        } else {
            setErrors({...errors, password:false})
            return;
        }
    

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


        // ESTO EN REGISTER
        // if(!validateString(username, 1, 50)){
        //     setErrors({...errors, name:true})
        //     errorToast('El nombre es requerido blbalbla')
        //     return;
        // } else {
        //     setErrors({...errors, name:false})
        //     return;
        // }

        // if(!validateEmail(email)){
            // setErrors({...errors, email:true})
            //     errorToast('El mail es invalido')
            //     return;
            // } else {
            //     setErrors({...errors, email:false})
            //     return;
            // }

        // if(!validatePassword(password, 8, 20, true, true)){
            // setErrors({...errors, password:true})
            //     errorToast('La contraseña debe tener entre 8 y 20 caracteres, al menos una mayuscula y un numero')
            //     return;
            // } else {
            //     setErrors({...errors, password:false})
            //     return;
            // }

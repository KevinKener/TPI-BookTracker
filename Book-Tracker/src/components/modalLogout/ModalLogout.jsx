import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../services/auth.context'

const ModalLogout = ({ setIsLogged, handleClose, show }) => {

    const navigate = useNavigate()
    const { handleUserLogout } = useContext(AuthenticationContext);

    const handleLogout = () => {
        handleUserLogout()
        navigate('/login')
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose} centered >
        <ModalHeader closeButton >
            <h3>Cerrar sesión</h3>
        </ModalHeader>
        <ModalBody>
            ¿Desea cerrar sesión?
        </ModalBody>
        <ModalFooter >
            <Button onClick={handleClose} variant='secondary' >
                Cancelar
            </Button>
            <Button onClick={handleLogout} variant='danger' >
                Cerrar sesión
            </Button>
        </ModalFooter>
    </Modal>
  )
}

export default ModalLogout
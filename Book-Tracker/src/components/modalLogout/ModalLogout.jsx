import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ModalLogout = ({ setIsLogged, handleClose, show }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLogged(false)
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
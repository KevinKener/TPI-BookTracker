import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../services/auth.context'
import { useTranslate } from '../hooks/translation/UseTranslate'

const ModalLogout = ({ setIsLogged, handleClose, show }) => {

    const translate = useTranslate();
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
            <h3>{translate("logout")}</h3>
        </ModalHeader>
        <ModalBody>
            {translate("wish_to_logout")}
        </ModalBody>
        <ModalFooter >
            <Button onClick={handleClose} variant='secondary' >
                {translate("cancel")}
            </Button>
            <Button onClick={handleLogout} variant='danger' >
                {translate("logout")}
            </Button>
        </ModalFooter>
    </Modal>
  )
}

export default ModalLogout
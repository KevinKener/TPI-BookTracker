import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import './adminDeleteModal.css'

const AdminDeleteModal = ({ user, showDeleteModal, closeModal, deleteUser }) => {


    const handleDeleteUser = () => {
        deleteUser(user.id);
    }

  return (
    <Modal show={showDeleteModal} onHide={closeModal} centered>
        <ModalHeader closeButton className='admin-modal-header'>
            Eliminar usuario
        </ModalHeader>
        <ModalBody className='admin-modal-body'>
            <span className="delete-text">
                ¿Está seguro de eliminar el usuario?
            </span>
            <span className="delete-clarify">
                (Esta acción es irreversible)
            </span> 
        <Button variant='danger' className='delete-modal-btn' onClick={handleDeleteUser}>
            Eliminar usuario
        </Button>
        </ModalBody>
        <ModalFooter>
            Cancelar
        </ModalFooter>
    </Modal>
  )
}

export default AdminDeleteModal
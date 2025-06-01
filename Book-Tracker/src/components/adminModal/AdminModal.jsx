import React, { useContext } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, FormSelect } from 'react-bootstrap';
import { useTranslate } from '../hooks/translation/UseTranslate';
import { AuthenticationContext } from '../services/auth.context';
import './adminModal.css'

const AdminModal = ({ user, showModal, closeModal }) => {

  const translate = useTranslate();
  const { role } = useContext(AuthenticationContext);

  // TRAER CONTEXT ROLE PARA OTORGAR ROLE

  return (

    // e-u- prefijo para clases del componente
        <Modal show={showModal} onHide={closeModal} centered size='md' >
        <ModalHeader closeButton className='e-u-header'>{translate("edit_user")}</ModalHeader>
        <ModalBody className='e-u-body'>
          <div className="modal-body">

          <div className="edit-title">
            {translate("username")}
          </div>
          <input className='edit-input'
            placeholder={user.username}
            />
          <br />
          <div className="edit-title">
            {translate("email")}
          </div>
          <input className='edit-input'
            placeholder={user.email}
            />
          <br />
          <div className="edit-title">
            {translate("role")} <span className='actual-role'>(actual: {user.role})</span>
          </div>
          <FormSelect className='edit-select'>
            <option value=""></option>
            <option value="reader">{translate("reader")}</option>
            <option value="admin">{translate("admin")}</option>
            { role === "mod" &&
              <option value="mod">{translate("mod")}</option>
            }
          </FormSelect>
          <br />
          <div className="delete-btn">

          <Button variant='danger'>
            Eliminar usuario
          </Button>
          </div>

            </div>
        </ModalBody>
        <ModalFooter>
            <Button variant='secondary' onClick={closeModal} >
                {translate("cancel")}
            </Button>
            <Button variant='success' onClick={closeModal} >
                {translate("save_changes")}
            </Button>
        </ModalFooter>
    </Modal>
  )
}

export default AdminModal
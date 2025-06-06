import { useContext } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, FormSelect } from 'react-bootstrap';
import { useTranslate } from '../hooks/translation/UseTranslate';
import { AuthenticationContext } from '../services/auth.context';
import './adminModal.css';

const AdminModal = ({ user, showEditModal, closeModal, updateUser, newUsername, newEmail, newRole, setNewUsername, setNewEmail, setNewRole }) => {

  const translate = useTranslate();
  const { role } = useContext(AuthenticationContext);

  // TRAER CONTEXT ROLE PARA OTORGAR ROLE

  const handleUpdateUser = () => {
    updateUser(user.id);
  }

  const handleNewUsername = (event) => {
    setNewUsername(event.target.value)
  }

  const handleNewEmail = (event) => {
    setNewEmail(event.target.value)
  }

  const handleNewRole = (event) => {
    setNewRole(event.target.value)
  }


  return (

    // e-u- prefijo para clases del componente
    <Modal show={showEditModal} onHide={closeModal} centered size='md' >
      <ModalHeader closeButton className='admin-modal-header'>{translate("edit_user")}</ModalHeader>
      <ModalBody className='admin-modal-body'>
        <div className="modal-body">

          <div className="edit-title">
            {translate("username")}
          </div>
          <input className='edit-input'
            placeholder={user.username}
            value={newUsername}
            onChange={handleNewUsername}
          />
          <br />
          <div className="edit-title">
            {translate("email")}
          </div>
          <input className='edit-input'
            placeholder={user.email}
            value={newEmail}
            onChange={handleNewEmail}
          />
          <br />
          <div className="edit-title">
            {translate("role")} <span className='actual-role'>(actual: {user.role})</span>
          </div>
          <FormSelect className='edit-select' value={newRole} onChange={handleNewRole}>
            <option></option>
            <option value="reader">{translate("reader")}</option>
            <option value="admin">{translate("admin")}</option>
            {role === "mod" &&
              <option value="mod">{translate("mod")}</option>
            }
          </FormSelect>

        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant='secondary' onClick={closeModal} >
          {translate("cancel")}
        </Button>
        <Button variant='success' onClick={handleUpdateUser} >
          {translate("save_changes")}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AdminModal
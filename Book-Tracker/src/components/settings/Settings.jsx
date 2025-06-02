import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthenticationContext } from '../services/auth.context';
import { successToast, errorToast } from '../notifications/notifications.js';
import { updateUser, deleteUser } from './settings.services.js'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';
import { useTranslate } from '../hooks/translation/UseTranslate.jsx';



function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { id, token, handleUserLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const translate = useTranslate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const updateData = {};
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        return errorToast('No ingresaste ningún dato para actualizar');
      }

      const updatedUser = await updateUser(id, token, updateData);
      successToast('Datos actualizados con éxito');
      console.log('Usuario actualizado:', updatedUser);
    } catch (error) {
      errorToast(error.message || 'Error al actualizar el usuario');
    }
  };

  const handleDeleteAccount = async () => {
  try {
    await deleteUser(id, token);
    successToast('Cuenta eliminada exitosamente');
    handleUserLogout();
    navigate('/');
  } catch (error) {
    errorToast(error.message || 'Error al eliminar la cuenta');
  }
};

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mt-5">
      <h2>Configuración de la Cuenta</h2>
      <hr />

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{translate("change_email")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={translate("new_email")}
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{translate("change_password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={translate("new_password")}
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSaveChanges}>
          {translate("save_changes")}
        </Button>
      </Form>

      <hr />

      <div className="mt-4">
        <h3>{translate("danger_zone")}</h3>
        <p>{translate("delete_account_warning")}</p>
        <Button variant="danger" onClick={openDeleteConfirmation}>
          {translate("delete_account")}
        </Button>
      </div>

      <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>{translate("confirm_delete_account")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{translate("sure_to_delete")}</p>
          <p><strong>{translate("action_not_reversible")}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            {translate("cancel")}
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            {translate("delete_account")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settings;
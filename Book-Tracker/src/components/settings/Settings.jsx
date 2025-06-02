import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthenticationContext } from '../services/auth.context';
import { successToast, errorToast } from '../notifications/notifications.js';
import { updateUser, deleteUser } from './settings.services.js'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'; // Asegúrate de que la ruta sea correcta



function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { id, token, handleUserLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

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
    handleUserLogout(); // Cerramos sesión
    navigate('/'); // Redirigimos al home
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
          <Form.Label>Cambiar Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nuevo email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cambiar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Form>

      <hr />

      <div className="mt-4">
        <h3>Zona de Peligro</h3>
        <p>Una vez que eliminas tu cuenta, no hay vuelta atrás. Por favor, piénsalo bien.</p>
        <Button variant="danger" onClick={openDeleteConfirmation}>
          Eliminar Cuenta
        </Button>
      </div>

      {/* Modal de Confirmación para Eliminar Cuenta */}
      <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación de Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres eliminar tu cuenta permanentemente?</p>
          <p><strong>Esta acción no se puede deshacer.</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Sí, Eliminar Cuenta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settings;
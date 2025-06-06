import { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { errorToast } from '../notifications/notifications';
import { useContext } from 'react';
import { AuthenticationContext } from '../services/auth.context';
import updateUserProfile from './editprofile.services.js';
import profileImageDefault from '../profile/profileImageDefault.png';
import './editProfile.css';

const EditProfile = ({ user, onClose, onUserUpdated }) => {
  const { id, token, role, updateUsername, updateProfilePicture } = useContext(AuthenticationContext);

  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [profileImage, setProfileImage] = useState(user.profilePictureUrl);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleImageUrlChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  const handleApplyImageUrl = () => {
    if (imageUrlInput.trim() !== '') {
      setProfileImage(imageUrlInput);
      setImageUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === '') {
      setUsernameError('El nombre de usuario no puede estar vacío.');
      return;
    } else {
      setUsernameError('');
    }

    const updatedUser = {
      username: username,
      description: description,
      profilePictureUrl: profileImage
    };

    try {
      const updated = await updateUserProfile(id, token, updatedUser);

      // Actualiza los valores para la NavBar
      updateUsername(username);
      updateProfilePicture(profileImage);

      // Actualiza Profile
      onUserUpdated(updated);
      onClose();

    } catch (error) {
      console.error(error);
      errorToast("Error al actualizar el perfil");
    }

    onClose();
  };

  const handleShowUrl = () => {
    setShowUrlInput(true);
  };

  const handleCloseUrl = () => {
    setShowUrlInput(false);
  };

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <div className="profile-image-container mb-3">
              <Image
                src={profileImage || profileImageDefault}
                alt="Foto de perfil"
                roundedCircle
                className="img-thumbnail"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>

            {!showUrlInput ? (
              <Button
                variant="info"
                className="btn-custom-image-url"
                onClick={handleShowUrl}
              >
                Cambiar foto (URL)
              </Button>
            ) : (
              <Form.Group controlId="imageUrlInput" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Pega la URL de la imagen aquí"
                  value={imageUrlInput}
                  onChange={handleImageUrlChange}
                />
                <div className="d-flex justify-content-center mt-2">
                  <Button
                    variant="secondary me-2"
                    className='btn-custom-secondary'
                    size="sm"
                    onClick={handleCloseUrl}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    className="btn-custom-primary"
                    size="sm"
                    onClick={handleApplyImageUrl}
                  >
                    Aplicar
                  </Button>
                </div>
              </Form.Group>
            )}
          </div>

          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={handleSetUsername}
              isInvalid={!!usernameError}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción"
              value={description || ""}
              onChange={handleSetDescription}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className='btn-custom-secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" className='btn-custom-primary' onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
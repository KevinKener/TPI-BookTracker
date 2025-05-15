import React, { useState } from 'react';
import styles from './EditProfile.module.css';

const EditProfile = ({ user, onClose, onUserUpdated }) => { // Recibimos 'onUserUpdated'
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [profileImage, setProfileImage] = useState(user.userPickUrl);
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      username: username,
      description: description,
      // Falta la imagen
    };

    onUserUpdated(updatedUser);
  };

  return (
    <div className={styles['modal-main']} style={{ display: 'block' }}>
      <form onSubmit={handleSubmit} className={styles.grid}>
        <div className={styles['modal-pick']}>
          {profileImage ? (
            <img src={profileImage} alt="Foto de perfil" />
          ) : (
            <img
              src="https://media.istockphoto.com/id/846183008/es/vector/%C3%ADcono-de-perfil-de-avatar-por-defecto-marcador-de-posici%C3%n-de-foto-gris.jpg?s=612x612&w=0&k=20&c=CLZoOwpSgoDpY_4ELU9OaY23p0B0mwjXCfbiyc7g9u4="
              alt="Foto de perfil"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="profileImageInput"
          />
          <button type="button" onClick={() => document.getElementById('profileImageInput').click()}>Cambiar foto</button>
        </div>
        <div className={styles['modal-text']}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className={styles['modal-text-name']}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            className={styles['modal-text-description']}
            id="description"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
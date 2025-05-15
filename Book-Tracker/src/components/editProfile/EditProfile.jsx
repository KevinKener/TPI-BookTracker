import { useState } from 'react';
import styles from './EditProfile.module.css';

const EditProfile = ({ user, onClose, onUserUpdated }) => {
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [newImageFile, setNewImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.userPickUrl);
  const [usernameError, setUsernameError] = useState(''); // Estado para el error del nombre de usuario

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

    if (username.trim() === '') {
      setUsernameError('El nombre de usuario no puede estar vacío.');
      return; // Detiene la ejecución si el nombre de usuario está vacío
    } else {
      setUsernameError(''); // Limpia el error si el nombre de usuario es válido
    }

    const updatedUser = {
      ...user,
      username: username,
      description: description,
      // falta enviar newImageFile (imagen)
    };

    onUserUpdated(updatedUser);
  };

  return (
    <div className={styles['modal-main']}>
      <form onSubmit={handleSubmit} className={styles.grid}>
        <div className={styles['modal-pick']}>
          {profileImage ? (
            <img src={profileImage} alt="Foto de perfil" />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
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
          {usernameError && <p className={styles['error-message']}>{usernameError}</p>} {/* Muestra el mensaje de error */}
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
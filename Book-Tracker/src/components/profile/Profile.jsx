import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StaticsCard from '../staticsCard/StaticsCard';
import styles from './Profile.module.css';
import EditProfile from '../editProfile/EditProfile';

const Profile = ({ users, setUsers }) => {
  const { id } = useParams();
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    navigate(`/profile/${userId}`); // Mantener la navegación al perfil actual
  };

  const handleUserUpdated = (updatedUser) => {
    // Actualizo el array users
    const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    closeEditModal();
  };

  if (!user) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div className={styles.body}>
      <div className={styles['profile-main']}>
        <div className={styles['profile-container']}>
          <div className={styles['profile']}>
            <div className={styles['img-profile']}>
              {user.userPickUrl ? (
                <img src={user.userPickUrl} alt="Foto de perfil" />
              ) : (
                <img
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <div className={styles['profile-info']}>
              <h1>{user.username}</h1>
              <p>Miembro desde: {user.memberSince}</p>
              <a href="#edit" onClick={openEditModal}>Editar perfil</a>
            </div>
          </div>

          <div className={styles['profile-description']}>
            <p>{user.description}</p>
          </div>
        </div>

        <div className={styles['stats']}>
          <StaticsCard text={'Libros leidos'} content={user.bookRead} />
          <StaticsCard text={'Paginas leidas'} content={user.pagesRead} extraClass="destacada" />
          <StaticsCard text={'Calificaciones promedio'} content={user.avgRating} />
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfile
          user={user}
          onClose={closeEditModal}
          onUserUpdated={handleUserUpdated} // Pasamos la función al EditProfile
        />
      )}
    </div>
  );
};

export default Profile;
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StaticsCard from '../staticsCard/StaticsCard';
import './Profile.css';
import EditProfile from '../editProfile/EditProfile';

const Profile = ({ users, setUsers }) => {
  const { id } = useParams();
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
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
    <div className="body">
      <div className="profile-main">

        <div className="profile">
          {user.userPickUrl ? (
            <img src={user.userPickUrl} alt="Foto de perfil" />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
              alt="Foto de perfil"
            />
          )}
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p>Miembro desde: {user.memberSince}</p>
            <a href="#" onClick={openEditModal}>Editar perfil</a>
          </div>
        </div>

        <div className="profile-description">
          <p>{user.description}</p>
        </div>

        <div className="stats">
          <StaticsCard text={'Libros leidos'} content={user.bookRead}/>
          <StaticsCard text={'Paginas leidas'} content={user.pagesRead} extraClass="destacada" />
          <StaticsCard text={'Calificaciones promedio'} content={user.avgRating}/>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfile
          user={user}
          onClose={closeEditModal}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
};

export default Profile;
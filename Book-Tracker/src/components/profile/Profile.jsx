import { useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../services/auth.context'
import { errorToast } from '../notifications/notifications';
import { useTranslate } from '../hooks/translation/UseTranslate'
import StaticsCard from '../staticsCard/StaticsCard';
import EditProfile from '../editProfile/EditProfile';
import fetchUserProfile from './profile.services.js';
import './Profile.css';

const Profile = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const translate = useTranslate();

  const { id, token } = useContext(AuthenticationContext);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    const getProfile = async() => {
      try {
        const data = await fetchUserProfile(id, token);
        setUser(data);
      } catch (error) {
        console.error("Error al cargar perfil: ", error);
        errorToast("Error al cargar el perfil");
      }
    };

    if (id && token) {
      getProfile();
    }

  }, [id, token])


  
  if (!user) {
      return <p>Cargando perfil...</p>;
    }

  return (
    <div className="body">
      <div className="profile-main">

        <div className="profile">
          {user.profilePictureUrl ? (
            <img src={user.profilePictureUrl} alt="Foto de perfil" />
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
          <StaticsCard text={translate("books_read")} content={user.bookRead}/>
          <StaticsCard text={translate("pages_read")} content={user.pagesRead} extraClass="destacada" />
          <StaticsCard text={translate("avg_rating")} content={user.avgRating}/>
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
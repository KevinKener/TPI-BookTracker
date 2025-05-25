import { useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../services/auth.context'
import { errorToast } from '../notifications/notifications';
import { useTranslate } from '../hooks/translation/UseTranslate'
import StaticsCard from '../staticsCard/StaticsCard';
import EditProfile from '../editProfile/EditProfile';
import fetchUserProfile, { calculateStats, fetchStatsProfile } from './profile.services.js';
import profileImageDefault from './profileImageDefault.png'
import './Profile.css';

const Profile = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    booksRead: 0,
    pagesRead: 0,
    avgRating: 0
  });

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
        const dataStats = await fetchStatsProfile(token);
        console.log(dataStats);
        calculateStats(dataStats, setStats);
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
              src={profileImageDefault}
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
          <StaticsCard text={translate("books_read")} content={stats.booksRead}/>
          <StaticsCard text={translate("pages_read")} content={stats.pagesRead} extraClass="destacada" />
          <StaticsCard text={translate("avg_rating")} content={stats.avgRating}/>
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
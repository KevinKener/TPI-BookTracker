import React from 'react'
import ModalLogout from '../modalLogout/ModalLogout'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from '../hooks/translation/UseTranslate'
import './userMenu.css';
import navbarImage from './avatarNavbar.png';

const UserMenu = () => {

  const navigate = useNavigate();
  const translate = useTranslate();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { token, username, id, profilePictureUrl } = useContext(AuthenticationContext);

  return (
    <div className="user-menu">
      <Dropdown className="user" align="end" >
        <DropdownToggle as="span" className='user-toggle no-caret' >
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt={username || 'Invitado'}
              className="user-navbar-image"
            />
          ) : (
            <img
              src={navbarImage}
              alt={username || 'Invitado'}
              className="user-navbar-image"
            />
          )}
        </DropdownToggle>

        <DropdownMenu>
          {token ?
            <>
              <DropdownItem onClick={() => navigate(`profile/${id}`)} > {/* El id depende de la sesion activa */}
                Perfil
              </DropdownItem>
              <DropdownItem onClick={() => navigate('profile-settings')} >
                Configuración
              </DropdownItem>
              <DropdownItem onClick={openModal} >
                Cerrar sesión
              </DropdownItem>
            </>
            :
            <DropdownItem onClick={() => navigate('login')} >
              Iniciar sesión
            </DropdownItem>
          }
        </DropdownMenu>
      </Dropdown>

      <ModalLogout
        show={showModal}
        handleClose={closeModal}
      />
    </div>
  )
}

export default UserMenu
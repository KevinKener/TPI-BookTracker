import ModalLogout from '../modalLogout/ModalLogout';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from '../hooks/translation/UseTranslate';
import './userMenu.css';
import navbarImage from './avatarNavbar.png';

const UserMenu = () => {

  const navigate = useNavigate();
  const translate = useTranslate();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { token, username, id, profilePictureUrl } = useContext(AuthenticationContext);

  const handleClickProfile = () => {
    navigate(`/profile/${id}`)
  }

  const hanldeClickSettings = () => {
    navigate('/profile-settings')
  }

  const handleClickLogin = () => {
    navigate('/login')
  }

  return (
    <div className="user-menu">
      <Dropdown className="user" align="end" >
        <DropdownToggle as="span" className='user-toggle no-caret' >
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt={username || translate("guest")}
              className="user-navbar-image"
            />
          ) : (
            <img
              src={navbarImage}
              alt={username || translate("guest")}
              className="user-navbar-image"
            />
          )}
        </DropdownToggle>

        <DropdownMenu>
          {token ?
            <>
              <DropdownItem onClick={handleClickProfile} >
                {translate("profile")}
              </DropdownItem>
              <DropdownItem onClick={hanldeClickSettings} >
                {translate("settings")}
              </DropdownItem>
              <DropdownItem onClick={openModal} >
                {translate("logout")}
              </DropdownItem>
            </>
            :
            <DropdownItem onClick={handleClickLogin} >
              {translate("login")}
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
import React from 'react'
import ModalLogout from '../modalLogout/ModalLogout'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserMenu = ({ isLogged, setIsLogged, username }) => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

  return (
    <div className="user-menu">
          <Dropdown className="user" align="end" >
            <DropdownToggle as="span" className='user-toggle no-caret' >
              { isLogged ?
                  username : "Invitado"
              }
            </DropdownToggle>

            <DropdownMenu>
              { isLogged ?
               <>
                <DropdownItem onClick={() => navigate('profile')} >
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
            setIsLogged={setIsLogged} />
        </div>
  )
}

export default UserMenu
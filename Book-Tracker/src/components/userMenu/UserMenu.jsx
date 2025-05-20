import React from 'react'
import ModalLogout from '../modalLogout/ModalLogout'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { isTokenValid } from "../services/auth/auth.helpers.js"
import { AuthenticationContext } from '../services/auth.context';

const UserMenu = () => {
  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const { token, username } = useContext(AuthenticationContext);

  // const id = 1; 
  // //Id hardcodeado para probar el partado user

  // if(isTokenValid(token)){
  //     setIsLogged(true);
  // }
  
  // USERMENU NO FUNCIONA

  return (
    <div className="user-menu">
          <Dropdown className="user" align="end" >
            <DropdownToggle as="span" className='user-toggle no-caret' >
              { username ?
                  username : "Invitado"
              }
            </DropdownToggle>

            <DropdownMenu>
              { token ?
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
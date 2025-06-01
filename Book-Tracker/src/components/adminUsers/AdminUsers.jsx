import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../services/auth.context';
import fetchUsers from './adminUsers.services.js';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../hooks/translation/UseTranslate';
import fetchUserProfile from '../profile/profile.services.js';
import AdminModal from '../adminModal/AdminModal.jsx';
import { errorToast } from '../notifications/notifications.js';
import './adminUsers.css'

const AdminUsers = () => {

    const { id, token, role } = useContext(AuthenticationContext);

    const translate = useTranslate();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const isNotMod = () => {
        errorToast(translate("not_mod"));
    }

    const handleOpenModal = (user) => () => {
        setSelectedUser(user);
        openModal();
        console.log(user);
    }

    const handleCloseModal = () => {
        closeModal();
        setSelectedUser(null);
    }

    const handleUserUpdated = (updatedUser) => {
        setSelectedUser(updatedUser);
    };

    { (role === 'mod' || role === 'admin') &&
        
        useEffect(() => {
        // COMPRUEBA DATOS DEL USUARIO LOGUEADO
            fetchUserProfile(id, token)
            .then(user => {
                    console.log("User role: ", user.role);
                    if (user.role !== "admin" && user.role !== "mod") {
                        navigate("/");
                    }
                })

        const getUsers = async () => {
            try {
                const usersData = await fetchUsers(token);
                setUsers(usersData);

            } catch (error) {
                errorToast(error);
            }
        };
    
        getUsers();
        }, []);
    }


  return (
    <div className='admin-page'>
    { (role === 'mod' || role === 'admin') &&
        
        <div className="admin-container">
            <div className="admin-grid">
                    <div className="admin-titles id-col">ID</div>
                    <div className="admin-titles">{translate("username")}</div>
                    <div className="admin-titles">{translate("email")}</div>
                    <div className="admin-titles">{translate("role")}</div>
                    <div className="admin-titles edit-col">{translate("edit")}</div>

                {/* MAPEO USUARIOS */}
                { users.map((user) => (
                        <React.Fragment key={user.id} >
                            <div className="admin-items id-col">{user.id}</div>
                            <div className="admin-items">{user.username}</div>
                            <div className="admin-items">{user.email}</div>
                            <div className="admin-items">{translate(user.role)}</div>

                            {/* EDIT USER / DELETE USER */}
                            <div className="admin-items clickable edit-col" onClick={
                                user.role === "mod" && role === "mod" ? handleOpenModal(user) : 
                                user.role !== "mod" ? handleOpenModal(user) :
                                isNotMod
                            }>edit</div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    }
    { showModal && (
            <AdminModal 
            user={selectedUser}
            showModal={showModal}
            closeModal={handleCloseModal}
        />)
    }
    
    </div>
  )
}

export default AdminUsers
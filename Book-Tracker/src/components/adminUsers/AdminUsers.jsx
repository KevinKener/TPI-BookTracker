import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../services/auth.context';
import fetchUsers from './adminUsers.services.js';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../hooks/translation/UseTranslate.jsx';
import fetchUserProfile from '../profile/profile.services.js';
import './adminUsers.css'

const AdminUsers = () => {

    const { id, token, role } = useContext(AuthenticationContext);

    const translate = useTranslate();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

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
                {
                    users.map((user) => (
                        <>
                            <div className="admin-items">{user.username}</div>
                            <div className="admin-items">{user.email}</div>

                            {/* EDIT USER / DELETE USER */}
                            <div className="admin-items" typeof='password'>edit</div>
                        </>
                    ))
                }
            </div>
        </div>
    }
    </div>
  )
}

export default AdminUsers
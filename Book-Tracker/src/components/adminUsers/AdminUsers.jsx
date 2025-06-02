import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import { fetchUsers, updateUser, deleteUser } from "./adminUsers.services.js";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../hooks/translation/UseTranslate";
import AdminModal from "../adminModal/AdminModal.jsx";
import { errorToast, infoToast, successToast } from "../notifications/notifications.js";
import { Trash3Fill } from 'react-bootstrap-icons'
import AdminDeleteModal from "../adminDeleteModal/AdminDeleteModal.jsx";
import "./adminUsers.css";
import { Button } from "react-bootstrap";

const AdminUsers = () => {
  const { token, role } = useContext(AuthenticationContext);

  const translate = useTranslate();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
    // MODAL EDIT
  const [showEditModal, setShowEditModal] = useState(false);

    // MODAL DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // NUEVOS DATOS
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  const isNotMod = () => {
    errorToast(translate("not_mod"));
  };

  const handleOpenEditModal = (user) => () => {
    setSelectedUser(user);
    setNewUsername(user.username);
    setNewEmail(user.email);
    setNewRole(user.role);
    setShowEditModal(true);
    console.log(user);
  };

  const handleOpenDeleteModal = (user) => () => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    console.log(user);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDelete = (deletedId) => {
    setUsers((prevUsers) => 
      prevUsers.filter((user) => user.id !== deletedId)
    )
  }

  const handleUpdateUser = async (id) => {
    try {
      const updatedData = {};

      if (newUsername.trim()) updatedData.username = newUsername;
      if (newEmail.trim()) updatedData.email = newEmail;
      if (newRole.trim()) updatedData.role = newRole;

      console.log(newRole);
      const updatedUser = await updateUser (id, token, updatedData);
      console.log(updatedUser);
      // handleUpdate es para actualizar el .map
      handleUpdate(updatedUser);
      handleCloseModal();
      successToast("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar", error);
      errorToast("Error al actualizar");
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id, token);
      // handleDelete es para actualizar el .map
      handleDelete(id);
      handleCloseModal();
      infoToast("Se ha eliminado un usuario");
    } catch (error) {
      console.error("Error al eliminar", error);      
    }
  }

  useEffect(() => {
    if (role === "mod" && role === "admin") {
      navigate("/");
      return;
    }

    const loadUsers = async () => {
      try {
        const data = await fetchUsers(token);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        errorToast("Error al cargar los usuarios");
      }
    };

    loadUsers();
  }, [role, token]);

  if (role === "mod" || role === "admin") {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-grid">
            <div className="admin-titles id-col">ID</div>
            <div className="admin-titles">{translate("username")}</div>
            <div className="admin-titles">{translate("email")}</div>
            <div className="admin-titles">{translate("role")}</div>
            <div className="admin-titles">{translate("edit")}</div>
            <div className="admin-titles blank-col"></div>

            {/* MAPEO USUARIOS */}
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <div className="admin-items id-col">{user.id}</div>
                <div className="admin-items">{user.username}</div>
                <div className="admin-items">{user.email}</div>
                <div className="admin-items">{translate(user.role)}</div>

                {/* EDIT USER / DELETE USER */}
                <div
                  className="admin-items clickable"
                  onClick={
                    user.role === "mod" && role === "mod"
                      ? handleOpenEditModal(user)
                      : user.role !== "mod"
                      ? handleOpenEditModal(user)
                      : isNotMod
                  }
                >
                  edit
                </div>

                <div className="admin-items blank-col">
                    <Button variant="danger">
                        <Trash3Fill size={20} className="clickable x-btn"
                        onClick={
                            user.role === "mod" && role === "mod"
                            ? handleOpenDeleteModal(user)
                            : user.role !== "mod"
                            ? handleOpenDeleteModal(user)
                            : isNotMod
                        }/>
                    </Button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {showEditModal && (
          <AdminModal
            user={selectedUser}
            showEditModal={showEditModal}
            closeModal={handleCloseModal}
            updateUser={handleUpdateUser}
            newUsername={newUsername}
            newEmail={newEmail}
            newRole={newRole}
            setNewUsername={setNewUsername}
            setNewEmail={setNewEmail}
            setNewRole={setNewRole}
          />
        )}
        { showDeleteModal && (
            <AdminDeleteModal 
                user={selectedUser}
                showDeleteModal={showDeleteModal}
                closeModal={handleCloseModal}
                deleteUser={handleDeleteUser}
            />
        )}
      </div>
    );
  }
};

export default AdminUsers;

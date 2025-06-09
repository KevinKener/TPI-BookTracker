import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import { fetchUsers, updateUser, deleteUser } from "./adminUsers.services.js";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../hooks/translation/UseTranslate";
import { errorToast, infoToast, successToast } from "../notifications/notifications.js";
import { Trash3Fill, CheckLg, XLg, PencilSquare } from 'react-bootstrap-icons';
import AdminDeleteModal from "../adminDeleteModal/AdminDeleteModal.jsx";
import { Button, FormSelect, Card, CardHeader } from "react-bootstrap";
import "./adminUsers.css";

const AdminUsers = () => {
  const { token, role, id, updateRole } = useContext(AuthenticationContext);

  const loggedId = id;

  const translate = useTranslate();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setNewRole(user.role);
  };

  const handleNewRole = (event) => {
    setNewRole(event.target.value);
  };

  const isNotMod = () => {
    errorToast(translate("not_mod"));
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
    setIsEditing(false);
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
    );
  };

  const handleUpdateUser = async (id) => {
    try {
      const updatedData = {};
      if (newRole) {
        updatedData.role = newRole;
      
        if (id === loggedId){
          updateRole(newRole);
        }
      }

      const updatedUser = await updateUser(id, token, updatedData);
      handleUpdate(updatedUser);
      successToast("Usuario actualizado correctamente");
      setIsEditing(false);
      setSelectedUser(null);

    } catch (error) {
      console.error("Error al actualizar", error);
      errorToast("Error al actualizar");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id, token);
      handleDelete(id);
      handleCloseModal();
      infoToast("Se ha eliminado un usuario");
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  const handleClickSave = () => {
    if (selectedUser) {
      handleUpdateUser(selectedUser.id);
    }
  };

  const handleClickCancel = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleClickEditUser = (user) => () => (
    handleEdit(user)
  );

  const handleClickDeleteUser = (user) => () => (
    handleOpenDeleteModal(user)
  );

  useEffect(() => {
    if (role !== "mod") {
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

  if (role === "mod") {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <Card className="admin-grid">
            <CardHeader className="admin-titles id-col">ID</CardHeader>
            <CardHeader className="admin-titles">{translate("username")}</CardHeader>
            <CardHeader className="admin-titles">{translate("email")}</CardHeader>
            <CardHeader className="admin-titles">{translate("role")}</CardHeader>
            <CardHeader className="admin-titles blank-col"></CardHeader>
            <CardHeader className="admin-titles blank-col"></CardHeader>

            {users.map((user) => (
              <React.Fragment key={user.id}>
                <div className="admin-items id-col">{user.id}</div>
                <div className="admin-items">{user.username}</div>
                <div className="admin-items">{user.email}</div>

                {isEditing && selectedUser?.id === user.id ? (
                  <FormSelect className="edit-select" value={newRole} onChange={handleNewRole}>
                    <option value="reader">{translate("reader")}</option>
                    <option value="admin">{translate("admin")}</option>
                    <option value="mod">{translate("mod")}</option>
                  </FormSelect>
                ) : (
                  <div className="admin-items">{translate(user.role)}</div>
                )}

                <div className="admin-items blank-col">
                  {isEditing && selectedUser?.id === user.id ? (
                    <>
                      <Button variant="success" className="admin-btn save-btn" onClick={handleClickSave}>
                        <CheckLg size={20} className="clickable delete-user-btn" />
                      </Button>
                      <Button variant="secondary" className="admin-btn" onClick={handleClickCancel}>
                        <XLg size={20} className="clickable delete-user-btn" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="secondary" className="admin-btn" onClick={handleClickEditUser(user)}>
                      <PencilSquare size={20} className="clickable delete-user-btn" />
                    </Button>
                  )}
                </div>

                <div className="admin-items blank-col">
                  <Button variant="danger" className="admin-btn" onClick={handleClickDeleteUser(user)}>
                    <Trash3Fill size={20} className="clickable delete-user-btn" />
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </Card>
        </div>

        {showDeleteModal && (
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

  return null;
};

export default AdminUsers;

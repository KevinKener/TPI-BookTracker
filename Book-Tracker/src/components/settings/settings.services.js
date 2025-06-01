const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

async function updateUser(id, token, updateData) {
  try {
    const response = await fetch(`${API_URL}/profile-settings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error actualizando el usuario');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('updateUser error:', error);
    throw error;
  }
}

async function deleteUser(id, token) {
  try {
    const response = await fetch(`${API_URL}/profile-settings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error eliminando la cuenta');
    }

    return true;
  } catch (error) {
    console.error('deleteUser error:', error);
    throw error;
  }
}

export { updateUser, deleteUser };
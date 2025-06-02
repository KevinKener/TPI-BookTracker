const API_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchUsers = async (token) => {
    return fetch(`${API_URL}/admin-users`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching users');
            return res.json()
        })
}

async function updateUser(id, token, updateData) {
  try {
    const response = await fetch(`${API_URL}/admin-users/${id}`, {
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
    const response = await fetch(`${API_URL}/admin-users/${id}`, {
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

export { fetchUsers, updateUser, deleteUser };

const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const updateUserProfile = async (id, token, updatedUser) => {
  try {
    const res = await fetch(`${API_URL}/profile/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    });

    if (!res.ok) {
      throw new Error('No se pudo actualizar el perfil');
    }

    const data = await res.json();
    return data;
    
  } catch (error) {
    throw error;
  }
};

export default updateUserProfile;
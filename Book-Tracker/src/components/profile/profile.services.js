const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchUserProfile = async (id, token) => {
    try {
        const res = await fetch(`${API_URL}/profile/${id}`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
        });

        if (!res.ok) {
            throw new Error('Error al obtener usuario');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default fetchUserProfile
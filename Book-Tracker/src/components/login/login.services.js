const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchLogin = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default fetchLogin
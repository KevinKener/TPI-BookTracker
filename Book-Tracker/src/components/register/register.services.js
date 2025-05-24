const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchRegister = async ( username, email, password ) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default fetchRegister
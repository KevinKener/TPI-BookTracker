const API_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchGenres = async (token) => {
    return fetch(`${API_URL}/genres`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching genres');
            return res.json()
        })
}

const fetchAuthors = async (token) => {
    return fetch(`${API_URL}/authors`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching authors');
            return res.json()
        })
}

const newBook = async (token, bookData) => {
    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
    });

    if (!response.ok) {
        let errorMessage = 'Error al crear libro';
        try {
            const data = await response.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch {
            errorMessage = await response.text();
        }
        throw new Error(errorMessage);
    }

    return response.json();
};
export { fetchGenres, fetchAuthors, newBook };
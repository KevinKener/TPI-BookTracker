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
    return fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
    });

}
export { fetchGenres, fetchAuthors, newBook };
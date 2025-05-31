const API_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchBooks = async () => {
    return fetch(`${API_URL}/books`)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching books');
            return res.json()
        })
}

const fetchGenres = async () => {
    return fetch(`${API_URL}/genres`)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching genres');
            return res.json()
        })
}

export { fetchBooks, fetchGenres }
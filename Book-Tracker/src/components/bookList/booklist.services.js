const API_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchLectures = (token) => {
    return fetch(`${API_URL}/my-books`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching books');
            return res.json()
        })
}

export default fetchLectures;
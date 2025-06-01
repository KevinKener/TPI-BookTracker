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

export default fetchUsers;
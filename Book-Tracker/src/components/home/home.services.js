const API_URL = import.meta.env.VITE_BASE_SERVER_URL

export const fetchLectures = async (token) => {
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

export const getBooks = async (token) => {
    return fetch(`${API_URL}/books`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching books');
            return res.json()
        })
}

export const getPopularBooks = async (token) => {
  const response = await fetch(`${API_URL}/popularbooks`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error('Fallo el fetch popular books');
  }
  return response.json();
};
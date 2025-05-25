const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener el libro");
  }

  return await res.json();
};

const addLecture = async (token, bookId) => {
  const res = await fetch(`${API_URL}/my-books`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({bookId}),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar la lectura");
  }

  return await res.json();
}

const fetchLectures = async (token) => {
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

export { fetchBook, addLecture, fetchLectures }
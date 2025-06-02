const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const fetchBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Error al obtener el libro");
  return await res.json();
};

export const updateBook = async (token, id, data) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar el libro");
  }

  return res.json();
};
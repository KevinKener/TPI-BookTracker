const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener el libro");
  }

  return await res.json();
};

export default fetchBook;

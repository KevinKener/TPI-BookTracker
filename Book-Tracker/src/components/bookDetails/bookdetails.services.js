const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Error al obtener el libro");
  return await res.json();
};

const addLecture = async (token, bookId) => {
  const res = await fetch(`${API_URL}/my-books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar la lectura");
  }

  return await res.json();
};

const fetchLectures = async (token) => {
  const res = await fetch(`${API_URL}/my-books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching books");
  return res.json();
};

const removeLecture = async (token, lectureId) => {
  try {
    const res = await fetch(`${API_URL}/my-books/${lectureId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error eliminando la lectura");
    }

    return lectureId;
  } catch (error) {
    console.error("deleteLecture error:", error);
    throw error;
  }
};

const deleteBook = async (token, bookId) => {
  const res = await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let errorMessage = "Error al eliminar el libro";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      } catch {}
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return null;
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

export { fetchBook, addLecture, fetchLectures, removeLecture, deleteBook };

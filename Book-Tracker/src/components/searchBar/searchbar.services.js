const API_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchBooks = async () => {
  try {
    const res = await fetch(`${API_URL}/books`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export default fetchBooks;
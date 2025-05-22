const API_URL = import.meta.env.VITE_BASE_SERVER_URL

async function updateLecture (token, lectureId, updateData) {
    try {
        const res = await fetch(`${API_URL}/my-books/${lectureId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
        });

        if (!res.ok) {
        throw new Error('Error actualizando la lectura');
        }

        const updatedLecture = await res.json();
        return updatedLecture;
    } catch (error) {
        console.error('updateLecture error:', error);
        throw error;
    }
}

async function deleteLecture (token, lectureId) {
    try {
        const res = await fetch(`${API_URL}/my-books/${lectureId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Error eliminando la lectura');
        }

        return lectureId;
    } catch (error) {
        console.error('deleteLecture error:', error);
        throw error;
    }
}

export { updateLecture, deleteLecture }
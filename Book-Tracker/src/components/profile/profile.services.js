const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

const fetchUserProfile = async (id, token) => {
    try {
        const res = await fetch(`${API_URL}/profile/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            throw new Error('Error al obtener usuario');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchStatsProfile = async (token) => {
    try {
        const res = await fetch(`${API_URL}/my-books`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error('Error al obtener estadisticas de usuario');
        }

        const dataStats = await res.json();
        return dataStats;
    } catch (error) {
        throw error;
    }
};

export const calculateStats = (dataStats, setStats) => {
    let booksReadCount = 0;
    let totalPagesRead = 0;
    let totalRating = 0;
    let ratedReadingsCount = 0;

    dataStats.forEach(reading => {
        if (reading.status === 'Leído') {
            booksReadCount++;
        }

        if (reading.pageCount) {
            totalPagesRead += reading.pageCount;
        }

        if (reading.rating && reading.rating > 0) {
            totalRating += reading.rating;
            ratedReadingsCount++;
        }
    });

    const averageRating = ratedReadingsCount > 0 ? (totalRating / ratedReadingsCount).toFixed(1) : 0;

    setStats({
        booksRead: booksReadCount,
        pagesRead: totalPagesRead,
        avgRating: averageRating
    });
};

export default fetchUserProfile
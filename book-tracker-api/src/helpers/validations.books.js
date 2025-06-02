export const validateTitle = (title, maxLength, minLength) => {
    return typeof title === "string" && title.length >= minLength && title.length <= maxLength;
};

export const validateAuthor = (authorId) => {
    return typeof authorId === "number" && !isNaN(authorId);
};

export const validatePages = (pages, max, min) => {
    const n = parseInt(pages);
    return !isNaN(n) && n >= min && n <= max;
};

export const validateGenre = (genres) => {
    return Array.isArray(genres) && genres.length > 0;
};

export const validateSummary = (summary, maxLength) => {
    return typeof summary === "string" && summary.length > 0 && summary.length <= maxLength;
};

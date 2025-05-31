export const validateTitle = (title, maxLength, minLength) => {
    if (minLength && title.length < minLength)
        return false;
    else if (maxLength && title.length > maxLength)
        return false;
    return true;
}

export const validateAuthor = (author) => {
    if (author === "")
        return false;
    return true;
}

export const validatePages = (pages, maxNumber, minNumber) => {
    if (!pages)
        return false;
    const n = parseInt(pages);
    if (n < minNumber || n > maxNumber)
        return false;
    return true;
}

export const validateGenre = (genre) => {
    if (genre === "")
        return false;
    return true;
}

export const validateSummary = (sumarry, maxLength) => {
     if (maxLength && sumarry.length > maxLength)
        return false;
    return true;
}
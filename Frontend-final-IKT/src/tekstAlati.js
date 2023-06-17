export const lc_match = (x, q) => {
    return x.toLowerCase().includes(q.toLowerCase());
}

export const prvo_veliko = (s) => {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
}
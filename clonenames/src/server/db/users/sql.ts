export const REGISTER = `
    INSERT INTO USERS (email, username, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email
`;

export const FIND_BY_EMAIL = `
    SELECT * FROM users WHERE email = $1
`;
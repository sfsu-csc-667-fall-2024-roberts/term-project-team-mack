import db from "../connection";

export const CREATE_GAME = `
INSERT INTO games RETURNING id;
`;

export const ADD_PLAYER = `
INSERT INTO GamePlayers (game_id, user_id, role, team)
VALUES ($1, $2, $3, $4);
`;

export const AVAILABLE_GAMES =  `
SELECT g.id, COUNT(gp.id) as player_count
FROM games g
JOIN GamePlayers gp ON g.id = gp.game_id
GROUP BY g.id
HAVING player_count < 4;
`;
export const CREATE_GAME = `
INSERT INTO games (created_by)
VALUES ($1)
RETURNING *, 1 as players;
`;

export const ADD_PLAYER = `
INSERT INTO gameplayers (game_id, user_id, role, team)
VALUES ($1, $2, $3, $4)
RETURNING game_id, (SELECT COUNT(*) FROM gameplayers WHERE game_id = $1) AS players;
`;

export const AVAILABLE_GAMES = `
SELECT 
  games.*, 
  users.username AS host, 
  (SELECT COUNT(*) FROM gameplayers WHERE games.id = gameplayers.game_id) AS players 
FROM 
  games 
JOIN 
  users 
ON 
  games.created_by = users.id
WHERE 
  games.id IN (
    SELECT game_id 
    FROM gameplayers 
    GROUP BY game_id 
    HAVING COUNT(*) < 4
  );`;

  export const GET_HOST = `
  SELECT username FROM users
  WHERE users.id = ($1);
  `;

  export const FIND_OPEN_TEAM = `
  SELECT team, COUNT(*) as players, ARRAY_AGG(role) as roles
  FROM gameplayers
  WHERE game_id = $1
  GROUP BY team;
  `;
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
  );  
`;

export const GET_HOST = `
SELECT u.username
FROM users u
JOIN games g ON g.created_by = u.id
WHERE g.id = $1;
`;

export const FIND_OPEN_TEAM = `
SELECT team, COUNT(*) as players, ARRAY_AGG(role) as roles
FROM gameplayers
WHERE game_id = $1
GROUP BY team;
`;

export const GET_TEAMS = `
SELECT 
  gp.team, 
  gp.role, 
  u.username 
FROM 
  gameplayers gp
JOIN 
  users u 
ON 
  gp.user_id = u.id
WHERE 
  gp.game_id = $1;
`;

export const UPDATE_PLAYER_ROLE = `
UPDATE gameplayers
SET team = $1, role = $2, joined_at = NOW()
WHERE user_id = $3 AND game_id = $4
RETURNING *;
`;

export const START_GAME = `
INSERT INTO gamestate (game_id, grid, current_turn)
VALUES ($1, $2, $3);
`;
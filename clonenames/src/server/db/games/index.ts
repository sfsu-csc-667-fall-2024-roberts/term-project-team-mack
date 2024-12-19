import { ADD_PLAYER, AVAILABLE_GAMES, CREATE_GAME, FIND_OPEN_TEAM, GET_HOST } from "./sql";
import db from "../connection";

const create = async (playerId: number, role: string, team: string) => {
    const game = await db.one<{
        created_by(created_by: any): unknown; id: number 
}>(CREATE_GAME, [playerId]);
    await db.one(ADD_PLAYER, [game.id, playerId, role, team]);

    return game;
};

const join = async (playerId: number, gameId: number, role: string, team: string) => {
    const game = await db.one(ADD_PLAYER, [gameId, playerId, role, team]);
    return game;
};

const availableGames = async () => {
    return db.any(AVAILABLE_GAMES);
};

const getHost = async (host_id: number) => {
    return db.one(GET_HOST, [host_id]);
};

const findOpenTeam = async (gameId: string) => {
    // query database for team info
    const teams = await db.any<{
        team: string;
        players: number;
        roles: string[];
    }>(FIND_OPEN_TEAM, [gameId]);

    // find team with fewer players (red by default)
    const redTeam = teams.find((team) => team.team === "red") || { players: 0, roles: [] };
    const blueTeam = teams.find((team) => team.team === "blue") || { players: 0, roles: [] };

    let assignedTeam: string;
    let assignedRole: string;

    if(redTeam.players <= blueTeam.players) {
        assignedTeam = "red";
        // @ts-expect-error
        // if red team has spymaster, assign operative, else assign spymaster
        assignedRole = redTeam.roles.includes("spymaster") ? "operative" : "spymaster";
    } else {
        // assign blue
        assignedTeam = "blue";
        // @ts-expect-error
        // if blue team has spymaster, assign operative, else assign spymaster
        assignedRole = blueTeam.roles.includes("spymaster") ? "operative" : "spymaster";
    }
    
    return { team: assignedTeam, role: assignedRole };
};

export default { create, join, availableGames, getHost, findOpenTeam };
import { ADD_PLAYER, AVAILABLE_GAMES, CREATE_GAME, GET_HOST } from "./sql";
import db from "../connection";

const create = async (playerId: number, role: string, team: string) => {
    const game = await db.one<{
        created_by(created_by: any): unknown; id: number 
}>(CREATE_GAME, [playerId]);
    await db.none(ADD_PLAYER, [game.id, playerId, role, team]);

    return game;
};

const join = async (playerId: number, gameId: number, role: string, team: string) => {
    await db.none(ADD_PLAYER, [gameId, playerId, role, team]);
};

const availableGames = async () => {
    return db.any(AVAILABLE_GAMES);
}

const getHost = async (host_id: number) => {
    return db.one(GET_HOST, [host_id]);
}

export default { create, join, availableGames, getHost };
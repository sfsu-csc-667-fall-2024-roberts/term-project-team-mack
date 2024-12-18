import { ADD_PLAYER, AVAILABLE_GAMES, CREATE_GAME } from "./sql";
import db from "../connection";

const create = async (playerId: number, role: string, team: string) => {
    const game = await db.one<{ id: number }>(CREATE_GAME, [playerId]);
    await db.none(ADD_PLAYER, [game.id, playerId, role, team]);

    return game;
};

const join = async (playerId: number, gameId: number, role: string, team: string) => {
    await db.none(ADD_PLAYER, [gameId, playerId, role, team]);
};

const availableGames = async () => {
    return db.any(AVAILABLE_GAMES);
}

export default { create, join, availableGames };
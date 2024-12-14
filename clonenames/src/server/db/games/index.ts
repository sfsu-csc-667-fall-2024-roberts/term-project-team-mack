import { ADD_PLAYER, AVAILABLE_GAMES, CREATE_GAME } from "./sql";
import db from "../connection";

const create = async (playerId: number, role: string, team: string) => {
    const gameId = await db.one<{ id: number }>(CREATE_GAME);
    await db.none(ADD_PLAYER, [gameId.id, playerId, role, team]);

    return gameId;
};

const join = async (playerId: number, gameId: number) => {
    await db.none(ADD_PLAYER, [gameId, playerId]);
};

const availableGames = async () => {
    return db.any(AVAILABLE_GAMES);
}

export default create;
import { ADD_PLAYER, AVAILABLE_GAMES, CREATE_GAME, FIND_OPEN_TEAM, GET_BOARD_AND_KEYCARD, GET_HOST, GET_PLAYERS, GET_TEAMS, START_GAME, UPDATE_PLAYER_ROLE } from "./sql";
import db from "../connection";

// HELPER FUNCTIONS FOR STARTING GAME 
function getRandomWords(): string[] {
    const wordPool: string[] = [
        "Apple", "Car", "Mountain", "Shadow", "River", 
        "Castle", "Knight", "Fire", "Water", "Sword", 
        "Shield", "Light", "Dark", "Cloud", "Storm", 
        "Tree", "Sun", "Moon", "Stone", "Gold", 
        "Silver", "Wolf", "Bear", "Eagle", "Lion", 
        "Fox", "Star", "Planet", "Wizard", "Dragon",
        "Bun", "Valley", "Yellow", "Airplane", "Dodo",
        "Robot", "Doom", "Yield", "Book", "Officer",
        "Space", "Ocean", "Desert", "Forest", "Jungle",
        "Ninja", "Samurai", "Viking", "Phantom", "Rebel",
        "Sunrise", "Sunset", "Galaxy", "Comet", "Meteor",
        "Shadow", "Echo", "Pulse", "Quantum", "Raven",
        "Crown", "King", "Queen", "Pirate", "Knight"
    ];

    const shuffle: string[] = [...wordPool].sort(() => Math.random() - 0.5);
    return shuffle.slice(0, 25);
}

// adjust the color distribution for the gameboard
function getRandomColorCodes(): string[] {
    const color: string[] = [
        "red", "blue", "neutral", "neutral", "neutral", 
        "neutral", "neutral", "neutral", "neutral", 
        "blue", "blue", "blue", "blue", "blue", "blue", 
        "blue", "red", "red", "red", "red", 
        "red", "red", "red", "assassin", "neutral"
    ];

    const shuffle: string[] = [...color].sort(() => Math.random() - 0.5);
    return shuffle;
}

// END OF HELPER FUNCTIONS

const create = async (playerId: number, role: string, team: string) => {
    try {
        const game = await db.one<{created_by(created_by: any): unknown; id: number }>(CREATE_GAME, [playerId]);
        const addedPlayer = await db.one(ADD_PLAYER, [game.id, playerId, role, team]);

        return game;
    } catch(err) {
        console.error("Error in create function:", err);
        throw err;
    }
};

const join = async (playerId: number, gameId: number, role: string, team: string) => {
    const game = await db.one(ADD_PLAYER, [gameId, playerId, role, team]);
    return game;
};

const availableGames = async () => {
    return db.any(AVAILABLE_GAMES);
};

const getHost = async (game_id: number) => {
    const host = await db.one(GET_HOST, [game_id]);
    return host.username;
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

const getTeams = async (gameId: string) => {
    const players = await db.any(GET_TEAMS, [gameId]);
    // organize players into their team and role 
    const redTeam = {
        spymaster: null,
        operative: null,
    };
    const blueTeam = {
        spymaster: null,
        operative: null,
    };

    players.forEach(player => {
        if (player.team === "red") {
            if (player.role === "spymaster") redTeam.spymaster = player.username;
            if (player.role === "operative") redTeam.operative = player.username;
        } else if (player.team === "blue") {
            if (player.role === "spymaster") blueTeam.spymaster = player.username;
            if (player.role === "operative") blueTeam.operative = player.username;
        }
    });

    return { redTeam, blueTeam };
}

const updatePlayerRole = async (userId: number, gameId: string, team: string, role: string) => {
    await db.none(UPDATE_PLAYER_ROLE, [team, role, userId, gameId]);
}

const getPlayers = async (gameId: string) => {
    const players = await db.any(GET_PLAYERS, [gameId]);
    console.log({ players });
    return players;
}

const start = async (gameId: string) => {
    const words = getRandomWords();
    const keyCard = getRandomColorCodes();

    // initialize the board grid
    const board = new Array(5).fill(null).map((_, rowIndex) => {
        return new Array(5).fill(null).map((_, colIndex) => {
            return {
                word: words[rowIndex * 5 + colIndex],
                type: keyCard[rowIndex * 5 + colIndex],
                revealed: false
            };
        });
    });
    
    // map colors to board
    let idx = 0;
    board.forEach((row) => {
        row.forEach((cell) => {
            cell.type = keyCard[idx++];
            cell.revealed = false;
        });
    });

    const boardJSON = JSON.stringify(board);
    const keyCardJSON = JSON.stringify(keyCard);

    await db.none(START_GAME, [gameId, boardJSON, keyCardJSON, 'red']);
}

const sendHint = async (gameId: string, hint: string, number: number) => {
    const data = {
        hint,
        number
    };
    return data;
}


const getBoardAndKeyCard = async (gameId: string) => {
    const data = await db.any(GET_BOARD_AND_KEYCARD, [gameId]);
    return data[0];
}

export default { create, join, availableGames, getHost, findOpenTeam, getTeams, updatePlayerRole, getPlayers, start, sendHint, getBoardAndKeyCard };
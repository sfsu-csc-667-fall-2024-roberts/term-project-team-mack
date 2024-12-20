export type Tile = {
    id: number;
    value: string;
    team: "red" | "blue" | "neutral" | "assassin";
    revealed: boolean;
}

export type Team = {
    name: "red" | "blue";
    players: string[];
    spymaster: string;
    guessRemaining: number;
}

export type GameState = {
    board: Tile[];
    teams: Team[];
    currentTurn: "red" | "blue";
    winner: "red" | "blue" | "none";
    time: number;
    startTime: Date;
    endTime: Date;
}
import express from "express";
import { Games } from "../db";

const router = express.Router();

// HELPER FUNCTIONS didn't know where to put it

function getRandomCodes() : string[] {
    const wordPool: string[] = [
        "Apple", "Car", "Mountain", "Shadow", "River", 
        "Castle", "Knight", "Fire", "Water", "Sword", 
        "Shield", "Light", "Dark", "Cloud", "Storm", 
        "Tree", "Sun", "Moon", "Stone", "Gold", 
        "Silver", "Wolf", "Bear", "Eagle", "Lion", 
        "Fox", "Star", "Planet", "Wizard", "Dragon",
        "Bun", "Valley", "Yellow", "Bebber", "Dodo",
        "Robot", "Doom", "Yield", "Book", "Officer"
    ];

    const shuffle: string[] = [...wordPool].sort(()=>Math.random() - 0.5);
    return shuffle.slice(0, 25);
}

function getRandomColorCodes() : string[] {
    const color: string[] = [
        "red", "blue", "neutral", "dark"
    ]

    const shuffle: string[] = [];


    for (let i = 0; i < 25; i++) {
        const randomColor = color[Math.floor(Math.random() * color.length)];
        shuffle.push(randomColor);
    }
    return shuffle
}

/*
* END OF HELPER FUNCTIONS
*/

router.post("/create", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const game = await Games.create(user_id, "spymaster", "red");
    console.log("Game from route:", game);

    const host = await Games.getHost(game.id);
    console.log("GOT HOST:", host);
    req.app.get("io").emit("game-created", { ...game, host: host.username });

    res.redirect(`/games/lobby/${game.id}`);
});

router.get("/availableGames", async (_req, res) => {
    const availableGames = await Games.availableGames();

    // @ts-expect-error
    res.render("available-games", { user: _req.session.user, availableGames });
});

router.post("/join/:gameId", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const { gameId } = req.params;

    // - Automatically put them in an open team and role 
    const { team, role } = await Games.findOpenTeam(gameId);
    const game = await Games.join(user_id, parseInt(gameId), role, team);

    req.app.get("io").emit("game-updated", game);
    res.redirect(`/games/lobby/${gameId}`);
}); 

router.post("/joinTeam/:gameId/:team/:role", async (req, res) => {
    const { gameId, team, role } = req.params;
    // @ts-expect-error
    const { id: user_id, username } = req.session.user;
    await Games.updatePlayerRole(user_id, gameId, team, role);
    req.app.get("io").emit("player-updated", {
        role,
        team,
        username
    });

    res.redirect(`/games/lobby/${gameId}`);
});

router.get("/lobby/:gameId", async (req, res) => {
    const { gameId } = req.params;
    const { redTeam, blueTeam } = await Games.getTeams(gameId);
    const host = await Games.getHost(parseInt(gameId));
    // @ts-expect-error
    const username  = req.session.user;

    console.log({ redTeam, blueTeam });

    res.render("lobby", { gameId, redTeam, blueTeam, host, username });
});

// get this in a fetch
router.get("/setGameboard", async (req, res) => {

    const codes: string[] = getRandomCodes();
    const colorCodes: string[] = getRandomColorCodes();

    const gameboard: { code: string; colorCode: string }[] = codes.map((code, index) => ({
        code,
        colorCode: colorCodes[index]
    }));

    res.json(gameboard);
});

export default router;
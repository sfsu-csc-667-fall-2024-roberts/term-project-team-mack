import express from "express";
import { Games } from "../db";

const router = express.Router();

router.post("/create", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const game = await Games.create(user_id, "spymaster", "red");
    console.log("Game from route:", game);

    const host = await Games.getHost(game.id);
    req.app.get("io").emit("game-created", { ...game, host: host });

    res.redirect(`/games/lobby/${game.id}`);
});

router.get("/availableGames", async (_req, res) => {
    const availableGames = await Games.availableGames();

    // @ts-expect-error
    res.render("available-games", { user: _req.session.user, availableGames });
});

router.post("/start/:gameId", async (req, res) => {
    const { gameId } = req.params;
    await Games.start(gameId);
    req.app.get("io").emit("game-started", gameId);
    
    res.redirect(`/games/${gameId}`);
});

router.post("/join/:gameId", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const { gameId } = req.params;

    // - automatically put them in an open team and role 
    const { team, role } = await Games.findOpenTeam(gameId);
    const game = await Games.join(user_id, parseInt(gameId), role, team);

    req.app.get("io").emit("game-updated", game);
    req.app.get("io").emit("player-updated", (gameId));
    res.redirect(`/games/lobby/${gameId}`);
}); 

router.post("/joinTeam/:gameId/:team/:role", async (req, res) => {
    const { gameId, team, role } = req.params;
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    await Games.updatePlayerRole(user_id, gameId, team, role);
    req.app.get("io").emit("player-updated", (gameId));

    res.redirect(`/games/lobby/${gameId}`);
});

router.get("/lobby/:gameId", async (req, res) => {
    const { gameId } = req.params;
    const { redTeam, blueTeam } = await Games.getTeams(gameId);
    const host = await Games.getHost(parseInt(gameId));
    // @ts-expect-error
    const { username }  = req.session.user;

    res.render("lobby", { gameId, redTeam, blueTeam, host , username });
});

router.post("/joining/:gameId", (req, res) => {
    const { gameId } = req.params;
    console.log("JOINING GAME:", gameId);

    res.redirect(`/games/${gameId}`);
});

router.get("/:gameId", async (req, res) => {
    // @ts-expect-error
    const { username } = req.session.user;
    const { gameId } = req.params;
    const data = await Games.getBoardAndKeyCard(gameId);
    const { redTeam, blueTeam } = await Games.getTeams(gameId);

    console.log("DATA:", data);
    console.log("TEAMS", redTeam, blueTeam);
    res.render("game", { gameId, board: data.grid, keycard: data.keycard, redTeam, blueTeam, username });
});

export default router;
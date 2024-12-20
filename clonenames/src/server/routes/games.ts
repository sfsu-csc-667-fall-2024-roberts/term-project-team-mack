import express from "express";
import { Games } from "../db";

const router = express.Router();

router.post("/create", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const game = await Games.create(user_id, "spymaster", "red");
    const host = await Games.getHost(game.id);
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
    // @ts-expect-error
    const { username } = req.session.user;
    const { gameId } = req.params;
    const { redTeam, blueTeam } = await Games.getTeams(gameId); 
    const host = await Games.getHost(parseInt(gameId));

    console.log({ host, username });
    res.render("lobby", { gameId, redTeam, blueTeam, host: host.username, username });
});

export default router;
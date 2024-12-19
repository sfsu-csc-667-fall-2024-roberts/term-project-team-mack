import express from "express";
import { Games } from "../db";

const router = express.Router();

router.post("/create", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const game = await Games.create(user_id, "operator", "red");
    // @ts-expect-error
    const host = await Games.getHost(game.created_by);
    req.app.get("io").emit("game-created", { ...game, host: host.username });

    res.redirect(`/games/${game.id}`);
});

router.get("/availableGames", async (_req, res) => {
    const availableGames = await Games.availableGames();

    // @ts-expect-error
    res.render("available-games", { user: _req.session.user, availableGames });
});

router.get("/:gameId", (req, res) => {
    const { gameId } = req.params;
    res.render("game", { title: `Game ${gameId}`, gameId });
});

export default router;
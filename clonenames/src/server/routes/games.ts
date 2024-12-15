import express from "express";
import { Games } from "../db";

const router = express.Router();

router.post("/create", async (req, res) => {
    // @ts-expect-error
    const { id: user_id } = req.session.user;
    const gameId = Games.create(user_id, "operator", "red");

    res.redirect(`/games/${gameId}`);
});

router.get("/:gameId", (req, res) => {
    const { gameId } = req.params;

    res.render("game", { title: `Game ${gameId}`, gameId });
});

export default router;
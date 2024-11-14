import express from "express";

const router = express.Router();

router.get("/:id/lobby", (_request, response) => {
    const id = _request.params.id;
    response.render("games/lobby", { title: "lobby", 
        desc: "After joining a game, you wait in the lobby for more players to join before the host starts",
        id});
});
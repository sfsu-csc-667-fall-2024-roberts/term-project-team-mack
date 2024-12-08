import express from "express";

const router = express.Router();

router.get("/:gameId", (req, res) => {
    const { gameId } = req.params;

    res.render("games/game", { title: `Game ${gameId}`, gameId });
});

router.get("/:gameId/lobby", (req, res) => {
    const { gameId } = req.params;

    res.render("/games/lobby", { title: "Game Lobby", gameId });
});

// router.get("/:id", (_request, response) => {
//     const id = _request.params.id;
//     response.render("games/game", { title: `game ${id}`,
//          desc: "Where the actual game will be played",
//          id});
// });

router.get("/find/:page", (_request, response) => {
    const page = _request.params.page;
    response.render("games/find", { title: "find-game", 
        desc: "This page will have a list of different open games than can be joined",
        page });
});

router.get("/:id/lobby", (_request, response) => {
    const id = _request.params.id;
    response.render("games/lobby", { title: "lobby", 
        desc: "After joining a game, you wait in the lobby for more players to join before the host starts",
        id});
});

export default router;
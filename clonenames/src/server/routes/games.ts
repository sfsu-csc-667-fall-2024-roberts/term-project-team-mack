import express from "express";

const router = express.Router();

router.get("/:id", (_request, response) => {
    const id = _request.params.id;
    response.render("games/game", { title: `game ${id}`,
         desc: "Where the actual game will be played",
         id});
});

router.get("/find/:page", (_request, response) => {
    const page = _request.params.page;
    response.render("games/find", { title: "find-game", 
        desc: "This page will have a list of different open games than can be joined",
        page });
});

export default router;
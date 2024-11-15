import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
    // @ts-expect-error
    response.render("landing", { title: "landing", desc: "Landing page", user: _request.session.user});
});

router.get("/about", (_request, response) => {
    response.render("about", { title: "about", desc: "This page will have information about the team and the project" });
});

router.get("/how-to-play", (_request, response) => {
    response.render("how-to-play", { title: "how-to-play", desc: "This page will have instructions of how the game, codenames, is played" });
});

export default router;
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    res.render("landing");
});

router.get("/signup", (_req, res) => {
    res.render("signup");
})

router.get("/home", (_req, res) => {
    // @ts-expect-error
    res.render("home", { title: "Main Lobby", desc: "This is the main lobby", user: _req.session.user});
});

router.get("/about", (_request, response) => {
    response.render("about", { title: "about", desc: "This page will have information about the team and the project" });
});

router.get("/how-to-play", (_request, response) => {
    response.render("how-to-play", { title: "how-to-play", desc: "This page will have instructions of how the game, codenames, is played" });
});

export default router;
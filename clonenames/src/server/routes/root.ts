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
    res.render("home", { user: _req.session.user });
});

router.get("/findGames", (_req, res) => {
    // @ts-expect-error
    res.render("find-games", { user: _req.session.user });
})

router.get("/about", (_req, response) => {
    const members = [
        {
            name: "Cole Chiodo",
            imageUrl: "https://ih1.redbubble.net/image.3878268147.5535/fposter,small,wall_texture,product,750x1000.jpg",
            githubLink: "https://github.com/colechiodo",
            description: "Cole is a senior at San Francisco State University studying Computer Science. He is interested in software development and machine learning."
        },
        {
            name: "Name",
            imageUrl: "image link",
            githubLink: "https://github.com/",
            description: "Description"
        },
        {
            name: "Name",
            imageUrl: "image link",
            githubLink: "https://github.com/",
            description: "Description"
        },
        {
            name: "Name",
            imageUrl: "image link",
            githubLink: "https://github.com/",
            description: "Description"
        }
    ];

    // @ts-expect-error
    response.render("about", { members, title: "about", desc: "This page will have information about the team and the project", user: _req.session.user });
});

router.get("/how-to-play", (_req, response) => {
    // @ts-expect-error
    response.render("how-to-play", { title: "how-to-play", desc: "This page will have instructions of how the game, codenames, is played", user: _req.session.user });
});

export default router;
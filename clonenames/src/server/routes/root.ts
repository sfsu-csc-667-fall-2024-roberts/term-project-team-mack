import express from "express";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/", (_req, res) => {
    res.render("landing");
});

router.get("/signup", (_req, res) => {
    res.render("signup");
})

router.get("/home", authenticationMiddleware, (_req, res) => {
    // @ts-expect-error
    res.render("home", { user: _req.session.user });
});

router.get("/about", (_req, response) => {
    const members = [
        {
            name: "Cole Chiodo",
            imageUrl: "https://ih1.redbubble.net/image.3878268147.5535/fposter,small,wall_texture,product,750x1000.jpg",
            githubLink: "https://github.com/colechiodo",
            description: "Cole is a senior at San Francisco State University studying Computer Science. He is interested in software development and machine learning."
        },
        {
            name: "Alex Hoff",
            imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQH18UCo3ZLsag/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703370250622?e=1740009600&v=beta&t=8-9dKvYQEwGvpureVwDUZC49hR7ENMcSq9WzZ-HZqQQ",
            githubLink: "https://github.com/alexhoff2",
            description: "Alex is a senior at San Francisco State University studying Computer Science. He is interested in Cyber-Security and Game Development."
        },
        {
            name: "Martin Pham",
            imageUrl: "/images/martin.jpg",
            githubLink: "https://github.com/mar10fam",
            description: "Martin is a senior at San Francisco State University studying Computer Science. He is interested in Machine Learning and Web Development."
        },
        {
            name: "Bryan Rodriguez",
            imageUrl: "image link",
            githubLink: "https://github.com/Bryan-Rodriguez-ldnbm",
            description: "Bryan is a senior at San Francisco State University studying Computer Science."
        }
    ];

    // @ts-expect-error
    response.render("about", { members, title: "about", desc: "This page will have information about the team and the project", user: _req.session.user });
});

router.get("/how-to-play", (_req, response) => {
    // @ts-expect-error
    response.render("how-to-play", { title: "how-to-play", desc: "This page will have instructions of how the game, codenames, is played", user: _req.session.user });
});

router.get("/profile", (_req, response) => {
    // @ts-expect-error
    response.render("profile", { title: "profile", desc: "This page will include details about the user, including preferences, messages, etc.", user: _req.session.user });
});

export default router;
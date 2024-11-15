import express from "express";
import { Users } from "../db";

const router = express.Router();


router.get("/login", (_request, response) => {
    response.render("auth/login", { title: "login", desc: "login page" });
});

router.get("/signup", (_request, response) => {
    response.render("auth/signup", { title: "signup", desc: "signup page" });
});

router.post("/register", async (request, response) => {
    const { email, username, password } = request.body;

    try {
        const user = await Users.register(email, username, password);
        // @ts-expect-error 
        request.session.user = user;

        response.redirect("/"); // take to landing page/home screen
    } catch(err) {
        console.error(err);
        response.redirect("/auth/signup");
    }
});

router.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await Users.login(email, password);
        // @ts-expect-error
        request.session.user = user;

        response.redirect("/");
    } catch(err) {
        console.error(err);
        response.redirect("/auth/login");
    }
});

router.get("/logout", (request, response) => {
    request.session.destroy((err) => {
        console.log(err);
        response.redirect("/");
    });
});

export default router;
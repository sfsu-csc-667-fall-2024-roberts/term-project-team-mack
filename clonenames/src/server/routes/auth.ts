import express from "express";
import { Users } from "../db";

const router = express.Router();

router.post("/register", async (request, response) => {
    const { email, username, password } = request.body;

    try {
        const user = await Users.register(email, username, password);
        // @ts-expect-error 
        request.session.user = user;

        response.redirect("/home");
    } catch(err) {
        console.error(err);
        response.redirect("/signup");
    }
});

router.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await Users.login(email, password);
        // @ts-expect-error
        request.session.user = user;

        response.redirect("/home");
    } catch(err) {
        console.error(err);
        response.redirect("/login");
    }
});

router.get("/logout", (request, response) => {
    request.session.destroy((err) => {
        console.log(err);
        response.redirect("/");
    });
});

export default router;
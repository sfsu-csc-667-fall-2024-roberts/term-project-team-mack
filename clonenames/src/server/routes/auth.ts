import express from "express";

const router = express.Router();

router.get("/login", (_request, response) => {
    response.render("auth/login", { title: "login", desc: "login page" });
});

router.get("/signup", (_request, response) => {
    response.render("auth/signup", { title: "signup", desc: "signup page" });
});

router.get("/logout", (_request, response) => {
    response.render("auth/logout", { title: "logout", desc: "logout" });
});

export default router;
import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
    response.render("root", { name: "Clonenames" });
});

export default router;
import express from "express";
import db from "../db/connection";

const router = express.Router();

router.get("/", async (_request, response) => {
    await db.any(`INSERT INTO test ("test_string") VALUES ($1)`, [
        `Helo on ${new Date().toLocaleString()}`
    ]);

    const results = await db.any(`SELECT * FROM test`);

    response.json(results);
});

export default router;
import express from "express";
import db from "../db/connection";

const router = express.Router();

router.get("/", async (_request, response) => {
    try {
        await db.any(`INSERT INTO test ("test_string") VALUES ($1)`, [
            `Hello on ${new Date().toLocaleString()}`
        ]);

        const results = await db.any(`SELECT * FROM test`);

        response.json(results);
    } catch(err) {
        // @ts-expect-error TODO: Fix this typing so I can use any in catch statements
        response.status(500).json({ error: err.message });
    }
});

export default router;
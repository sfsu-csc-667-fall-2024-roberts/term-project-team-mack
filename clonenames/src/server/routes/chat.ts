import express from "express";

const router = express.Router();

router.post("/:roomId", (req, res) => {
    const { roomId } = req.params;
    const { message } = req.body;

    // @ts-expect-error
    const { username } = req.session.user;
    const io = req.app.get("io");
    io.emit(`message:${roomId}`, {
        message,
        sender: username,
        timestamp: new Date()
    });

    res.status(200).send();
});

export default router;
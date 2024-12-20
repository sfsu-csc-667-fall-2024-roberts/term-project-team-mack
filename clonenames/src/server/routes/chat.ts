import express from "express";

const router = express.Router();

router.post("/:roomId", (req, res) => {
    // const { roomId } = res.locals.roomId;
    const { message } = req.body;

    // @ts-expect-error
    const { username } = req.session.user;
    const io = req.app.get("io");

    io.emit(`message:0`, {
        message,
        sender: username,
        timestamp: new Date()
    });

    res.status(200).send();
});

export default router;
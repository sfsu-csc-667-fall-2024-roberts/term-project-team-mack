import { NextFunction, Request, Response } from "express";

const chatMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const gameId = request.params.gameId;
    
    // roomId is gameId if it exists, otherwise it's 0
    response.locals.roomId = gameId ? gameId : 0;

    next();
};

export default chatMiddleware;
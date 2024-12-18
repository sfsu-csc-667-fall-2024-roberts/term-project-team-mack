import { NextFunction, Request, Response } from "express";

const authenticationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // @ts-expect-error
    if(!request.session.user) {
        response.redirect("/");
    } else {
        // @ts-expect-error
        response.locals.user = request.session.user;
        next();
    }
}

export default authenticationMiddleware;
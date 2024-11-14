import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import * as routes from './routes';
import connectLiveReload from "connect-livereload";
import livereload from "livereload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

/* Updated use routes */
app.use("/", routes.home);
app.use("/lobby", routes.mainLobby);
app.use("/auth", routes.auth);
app.use("/games", routes.games);
app.use((_request, _response, next) => {
next(httpErrors(404));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((_request, _response, next) => {
    next(httpErrors(404));
});

app.use(morgan("dev"));

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

if (process.env.NODE_ENV === "development") {
    const reloadServer = livereload.createServer();
    reloadServer.watch(staticPath);
    reloadServer.server.once("connection", () => {
        setTimeout(() => {
            reloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}
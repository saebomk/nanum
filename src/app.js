import "core-js";
import "@babel/polyfill";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";

import passport from "passport";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// app.use(function (req, res, next) {
//   res.setHeader(
//     "Content-Security-Policy",
//     "script-src 'self' https://archive.org"
//   );
//   return next();
// });

app.use(helmet());
app.set("view engine", "pug");

// Not a good practice for user-generated content (e.g. avatar) security, should be available for redirecting
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.static("assets/img"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

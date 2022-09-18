import dotenv from "dotenv";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import ConnectSqlite from "connect-sqlite3";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import pluralize from "pluralize";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { DATABASE_FOLDER, SESSION_SECRET, SESSION_DATABASE } from "./const.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * App entry point
 */

// Get env vars
dotenv.config();

// Connects sqlite to session
const SQLiteStore = ConnectSqlite(session);

// Setup express
const app = express();

app.locals.pluralize = pluralize;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new SQLiteStore({ db: SESSION_DATABASE, dir: DATABASE_FOLDER }),
	})
);

app.use(passport.authenticate("session"));

app.use("/", indexRouter);

app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;

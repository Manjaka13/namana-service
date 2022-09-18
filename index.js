#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "./app.js";
import debug from "debug";
// const debug = require("debug")("todos:server");
import http from "http";

/**
 * Normalize a port into a number, string or false
 * @param  {string|number} val port value
 * @return {string|number|boolean} normalized port
 */
const normalizePort = (val) => {
	const port = parseInt(val, 10);
	if (isNaN(port)) return val;
	if (port >= 0) return port;
	return false;
};

/**
 * Event listener for HTTP server "error" event
 * @param  {object} error object containing error info
 */
const onError = (error) => {
	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
	if (error.syscall !== "listen") throw error;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
};

// Set port from environment
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

// Setup HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
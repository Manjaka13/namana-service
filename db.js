import sqlite3 from "sqlite3";
import mkdirp from "mkdirp";
import { randomBytes, hash } from "./crypt.js";
import { userSchema } from "./schema/index.js";

/**
 * SQLite communication interface
 */

mkdirp.sync("./var/db");

var db = new sqlite3.Database("./var/db/todos.db");

db.serialize(function () {
	// Create the database schema
	db.run(userSchema);

	db.run(
		"CREATE TABLE IF NOT EXISTS federated_credentials ( \
	    id INTEGER PRIMARY KEY, \
	    user_id INTEGER NOT NULL, \
	    provider TEXT NOT NULL, \
	    subject TEXT NOT NULL, \
	    UNIQUE (provider, subject) \
	  )"
	);

	db.run(
		"CREATE TABLE IF NOT EXISTS todos ( \
	    id INTEGER PRIMARY KEY, \
	    owner_id INTEGER NOT NULL, \
	    title TEXT NOT NULL, \
	    completed INTEGER \
  )"
	);

	// create an initial user (username: alice, password: letmein)
	var salt = randomBytes();
	db.run(
		"INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
		["alice", hash("letmein", salt), salt]
	);
});

export default db;

import sqlite3 from "sqlite3";
import mkdirp from "mkdirp";
import { randomBytes, hash } from "./crypt.js";
import { userSchema } from "./schema/index.js";
import {
	DATABASE_FOLDER,
	MAIN_DATABASE,
	MASTER_USER_NAME,
	MASTER_USER_PASSWORD,
} from "./const.js";

/**
 * SQLite communication interface
 */

mkdirp.sync(DATABASE_FOLDER);

const db = new sqlite3.Database(`${DATABASE_FOLDER}/${MAIN_DATABASE}`);

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

	// Create master user
	var salt = randomBytes();
	db.run(
		"INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
		[MASTER_USER_NAME, hash(MASTER_USER_PASSWORD, salt), salt]
	);
});

export default db;

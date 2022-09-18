/**
 * User schema
 */

const userSchema = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		username TEXT UNIQUE,
		hashed_password BLOB,
		salt BLOB,
		name TEXT,
		email TEXT UNIQUE,
		email_verified INTEGER
	)
`;

export default userSchema;

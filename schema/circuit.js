/**
 * Circuit schema
 */

const circuitSchema = `
	CREATE TABLE IF NOT EXISTS todos (
		id INTEGER PRIMARY KEY,
		owner_id INTEGER NOT NULL,
		title TEXT NOT NULL,
		completed INTEGER
	)
`;

export default circuitSchema;

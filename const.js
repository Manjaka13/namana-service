/**
 * Export constant variables from here
 */

export const CRYPTO_ITERATIONS = process.env.CRYPTO_ITERATIONS || 310000;
export const CRYPTO_KEYLEN = process.env.CRYPTO_KEYLEN || 32;
export const CRYPTO_DIGEST = process.env.CRYPTO_DIGEST || "sha256";
export const DATABASE_FOLDER = "./db";
export const SESSION_SECRET = process.env.SESSION_SECRET || "selena tehdi";
export const SESSION_DATABASE = "session.db";
export const MAIN_DATABASE = "namanagasy.db";
export const MASTER_USER_NAME = process.env.MASTER_USER_NAME || "root";
export const MASTER_USER_PASSWORD = process.env.MASTER_USER_PASSWORD || "root";

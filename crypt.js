import crypto from "crypto";
import { CRYPTO_ITERATIONS, CRYPTO_KEYLEN, CRYPTO_DIGEST } from "./const.js";

/**
 * Crypto methods
 */

const crypt = {
	/**
	 * Compares a normal str with a hashed str
	 * @param  {string} str       the normal string
	 * @param  {string} hashedStr the hashed string
	 * @param  {BLOB} salt      the salt
	 * @return {promise}          this returns a promise
	 */
	compare(str, hashedStr, salt) {
		return new Promise((resolve, reject) => {
			crypto.pbkdf2(
				str,
				salt,
				CRYPTO_ITERATIONS,
				CRYPTO_KEYLEN,
				CRYPTO_DIGEST,
				(err, hashedPassword) => {
					if (err) reject(err);
					else if (!crypto.timingSafeEqual(hashedStr, hashedPassword))
						reject("Incorrect username or password.");
					else resolve();
				}
			);
		});
	},

	/**
	 * Generates 16 random bytes
	 * @return {[type]} [description]
	 */
	randomBytes() {
		return crypto.randomBytes(16);
	},

	/**
	 * Hashes string
	 * @param  {string} str  string to be hashed
	 * @param  {salt} salt the salt
	 * @return {string}      returns a hashed string
	 */
	hash(str, salt) {
		return crypto.pbkdf2Sync(
			str,
			salt,
			CRYPTO_ITERATIONS,
			CRYPTO_KEYLEN,
			CRYPTO_DIGEST
		);
	},
};

export const compare = crypt.compare;
export const randomBytes = crypt.randomBytes;
export const hash = crypt.hash;
export default crypt;

import crypto from 'crypto';
import { config } from 'dotenv';
config();

export function passHash(password) {
	const hash = crypto.createHash('sha256');
	const saltedData = password + process.env.SALT;
	hash.update(saltedData);
	return hash.digest('hex');
}

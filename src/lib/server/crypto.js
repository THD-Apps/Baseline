import crypto from 'crypto';

export function hashData(userData) {
	const hash = crypto.createHash('sha256');
	const saltedData = JSON.stringify(userData) + 'SUPERSECRETSALT';
	hash.update(saltedData);
	return hash.digest('hex');
}

export function verifyHash(userData, suppliedHash) {
	const hash = crypto.createHash('sha256');
	const saltedData = JSON.stringify(userData) + 'SUPERSECRETSALT';
	hash.update(saltedData);
	const receivedHash = hash.digest('hex');
	return receivedHash === suppliedHash;
}

export function passHash(password) {
	const hash = crypto.createHash('sha256');
	const saltedData = password + 'SUPERSECRETSALT';
	hash.update(saltedData);
	return hash.digest('hex');
}

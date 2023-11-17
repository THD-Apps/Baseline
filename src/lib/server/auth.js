import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const authenticatePermission = (event, permission) => {
	let userData = null;
	const { cookies } = event;
	const token = cookies.get('jwt') ?? null;
	if (token) {
		try {
			userData = jwt.verify(token, process.env.SALT);
		} catch (error) {
			userData = null;
		}
	}
	if (userData && userData.roles.includes(permission)) {
		return userData;
	}
	return null;
};

export function handleLoginRedirect(event, message = 'You must be logged in to access this page') {
	const redirectTo = event.url.pathname + event.url.search;
	event.cookies.set('redirect', redirectTo, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: 600
	});
	return `/login?&message=${message}`;
}

export function getJwt(event, cookies, data) {
	data.ip = event.getClientAddress();
	const token = jwt.sign(data, process.env.SALT);
	cookies.set('jwt', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: process.env.COOKIE_TIMEOUT
	});
}

export const authenticateUser = (event) => {
	let userData = null;
	const { cookies } = event;
	const token = cookies.get('jwt') ?? null;
	if (token) {
		try {
			userData = jwt.verify(token, process.env.SALT);
		} catch (error) {
			userData = null;
		}
	}
	return userData;
};

import { verifyHash } from '$lib/server/crypto';

export const authenticateUser = (event) => {
	const { cookies } = event;
	const userData = JSON.parse(cookies.get('user') ?? '{}');
	const token = cookies.get('token') ?? '';
	if (verifyHash(userData, token)) return userData;
	return null;
};

export const authenticatePermission = (event, permission) => {
	const { cookies } = event;
	const userData = JSON.parse(cookies.get('user') ?? '{}');
	const token = cookies.get('token') ?? '';
	if (verifyHash(userData, token) && userData[permission]) return userData;
	return null;
};

export function handleLoginRedirect(event, message = 'You must be logged in to access this page') {
	const redirectTo = event.url.pathname + event.url.search;
	return `/login?redirectTo=${redirectTo}&message=${message}`;
}

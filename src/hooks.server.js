import { authenticateUser, handleLoginRedirect } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		const user = authenticateUser(event);
		if (!user) {
			throw redirect(303, handleLoginRedirect(event));
		}
		event.locals.user = user;
	}
	const response = await resolve(event);
	return response;
};

import { authenticateUser, handleLoginRedirect } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const user = authenticateUser(event);
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!user) {
			throw redirect(303, handleLoginRedirect(event));
		}

		// if (event.url.pathname.startsWith('/dashboard/admin')) {
		// 	if (user.role !== 'admin') {
		// 		throw redirect(303, '/unauthorized');
		// 	}
		// }
	}

	const response = await resolve(event);

	return response;
};

import { authenticateUser } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = authenticateUser(event);
	if (!user) {
		throw redirect(302, '/unauthorized');
	}
	return { user: user };
};

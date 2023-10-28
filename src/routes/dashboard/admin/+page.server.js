import { authenticatePermission } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!authenticatePermission(event, 'admin')) {
		throw redirect(302, '/unauthorized');
	}
};

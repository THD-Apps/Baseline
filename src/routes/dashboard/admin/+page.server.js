import { authenticatePermission } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!authenticatePermission(event, 'saveUser')) {
		throw redirect(302, '/unauthorized');
	}
};

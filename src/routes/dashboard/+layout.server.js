import { redirect } from '@sveltejs/kit';
export async function load({ locals, cookies }) {
	const redirectURL = cookies.get('redirect') ?? null;
	if (redirectURL) {
		cookies.delete('redirect');
		if (redirectURL != '/dashboard' && redirectURL != '/dashboard/') {
			throw redirect(302, redirectURL);
		}
	}
	return {
		user: locals.user
	};
}

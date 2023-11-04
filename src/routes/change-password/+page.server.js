import { fail } from '@sveltejs/kit';
import { passHash } from '$lib/server/crypto';
import db from '$lib/server/db';

export const actions = {
	reset: async (event) => {
		let request = event.request;
		const data = await request.formData();
		const password = data.get('password');
		const token = data.get('token');
		try {
			if (!token) {
				return fail(400, { incorrect: true });
			}
			if (
				!(
					/^[^\s]*$/.test(password) &&
					/[A-Z]/.test(password) &&
					/[a-z]/.test(password) &&
					/\d/.test(password) &&
					password.length >= 8
				)
			) {
				return fail(400, { invalidPassword: true });
			}
			const updated = await db('users')
				.where('reset', token)
				.update({
					reset: '',
					password: passHash(password)
				});
			if (updated) {
				return fail(200, { success: true });
			} else {
				return fail(400, { incorrect: true });
			}
		} catch (error) {
			return fail(400, { error: true });
		}
	}
};

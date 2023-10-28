import { redirect, fail } from '@sveltejs/kit';
import { hashData, passHash } from '$lib/server/crypto';
import db from '$lib/server/db';

export const actions = {
	loginUser: async (event) => {
		let cookies = event.cookies;
		let request = event.request;
		let pass = false;
		let redirectTo = null;
		try {
			const data = await request.formData();
			const user = data.get('user');
			const password = data.get('password');
			redirectTo = data.get('redirectTo') ?? null;
			if (!user || !password) {
				return fail(400, { user, missing: true });
			}
			const rows = await db('users')
				.select()
				.where({ user: user, password: passHash(password) });

			if (rows.length > 0) {
				pass = true;
				const userData = rows[0];
				cookies.set('user', JSON.stringify(userData), {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					maxAge: 60 * 60 * 8
				});
				cookies.set('token', hashData(userData), {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					maxAge: 60 * 60 * 8
				});
			} else {
				return fail(400, { user, incorrect: true });
			}
		} catch (error) {
			console.log(error);
		}
		if (pass) {
			if (redirectTo) {
				throw redirect(302, `/${redirectTo.slice(1)}`);
			} else {
				throw redirect(303, '/dashboard');
			}
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('user');
		cookies.delete('token');
		throw redirect(303, '/');
	}
};

import { redirect, fail } from '@sveltejs/kit';
import { passHash } from '$lib/server/crypto';
import { getJwt } from '$lib/server/auth';
import { config } from 'dotenv';

config();
import db from '$lib/server/db';
import DescopeClient from '@descope/node-sdk';

export async function load(event) {
	let cookies = event.cookies;
	let url = event.url;
	const code = url.searchParams.get('code') ?? null;
	if (code) {
		const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
		const resp = await descopeClient.oauth.exchange(code);
		if (!resp.ok) {
			return {
				incorrect: false,
				error: true
			};
		} else {
			let email = resp.data.user.email;
			let pass = false;
			try {
				const rows = await db('users').select().where({ email: email });
				if (rows.length > 0) {
					pass = true;
					const userData = rows[0];
					getJwt(event, cookies, userData);
				}
			} catch (error) {
				return {
					incorrect: false,
					error: true
				};
			}
			if (pass) {
				throw redirect(303, '/loading');
			} else
				return {
					incorrect: true,
					error: false
				};
		}
	}
	return {
		incorrect: false,
		error: false
	};
}

export const actions = {
	loginUser: async (event) => {
		let cookies = event.cookies;
		let request = event.request;
		let pass = false;
		const data = await request.formData();
		const user = data.get('user') ?? null;
		const password = data.get('password') ?? null;
		try {
			if (!user || !password) {
				return fail(400, { user, missing: true });
			}
			const rows = await db('users')
				.select()
				.where({ user: user, password: passHash(password) });

			if (rows.length > 0) {
				pass = true;
				const userData = rows[0];
				getJwt(event, cookies, userData);
			} else {
				return fail(400, { user, incorrect: true });
			}
		} catch (error) {
			return fail(400, { user, error: true });
		}
		if (pass) {
			throw redirect(303, '/loading');
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('user');
		cookies.delete('token');
		cookies.delete('jwt');
		cookies.delete('redirect');
		throw redirect(303, '/');
	},
	google: async () => {
		let redirectUrl = false;
		try {
			const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
			const provider = 'google';
			const redirect_url = process.env.DESCOPE_REDIRECT_URL;
			const resp = await descopeClient.oauth.start[provider](redirect_url);
			if (!resp.ok) {
				return fail(400, { error: true });
			} else {
				const provider_url = resp.data.url;
				redirectUrl = provider_url;
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (redirectUrl) throw redirect(303, redirectUrl);
	},
	facebook: async () => {
		let redirectUrl = false;
		try {
			const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
			const provider = 'facebook';
			const redirect_url = process.env.DESCOPE_REDIRECT_URL;
			const resp = await descopeClient.oauth.start[provider](redirect_url);
			if (!resp.ok) {
				return fail(400, { error: true });
			} else {
				const provider_url = resp.data.url;
				redirectUrl = provider_url;
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (redirectUrl) throw redirect(303, redirectUrl);
	},
	apple: async () => {
		let redirectUrl = false;
		try {
			const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
			const provider = 'apple';
			const redirect_url = process.env.DESCOPE_REDIRECT_URL;
			const resp = await descopeClient.oauth.start[provider](redirect_url);
			if (!resp.ok) {
				return fail(400, { error: true });
			} else {
				const provider_url = resp.data.url;
				redirectUrl = provider_url;
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (redirectUrl) throw redirect(303, redirectUrl);
	}
};

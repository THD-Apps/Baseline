import { redirect, fail } from '@sveltejs/kit';
import { hashData } from '$lib/server/crypto';
import db from '$lib/server/db';
import DescopeClient from '@descope/node-sdk';

export async function load({ url }) {
	const phone = url.searchParams.get('phone') ?? null;
	if (!phone || phone.length != 10 || isNaN(phone)) {
		throw redirect(303, '/login');
	}
	return { phone: phone };
}

export const actions = {
	loginUser: async (event) => {
		let cookies = event.cookies;
		let request = event.request;
		let pass = false;
		const data = await request.formData();
		const phone = data.get('phone') ?? null;
		const pin = data.get('pin') ?? null;
		try {
			if (!phone || !pin || phone.length != 10 || isNaN(phone) || isNaN(pin) || pin.length != 6) {
				return fail(400, { phone: phone, missing: true });
			}
			const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
			const resp = await descopeClient.otp.verify['sms']('+1' + phone, pin);
			if (!resp.ok) {
				return fail(400, { phone: phone, incorrect: true });
			} else {
				const phoneResponse = resp.data.user.phone.substring(2);
				const rows = await db('users').select().where({ phone: phoneResponse });
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
					return fail(400, { phone, incorrect: true });
				}
			}
		} catch (error) {
			return fail(400, { incorrect: true });
		}
		if (pass) {
			throw redirect(303, '/loading');
		}
	}
};

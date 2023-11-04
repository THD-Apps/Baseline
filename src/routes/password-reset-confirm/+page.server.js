import { redirect, fail } from '@sveltejs/kit';
import db from '$lib/server/db';
import DescopeClient from '@descope/node-sdk';
import { v4 as uuid } from 'uuid';

export async function load({ url }) {
	const phone = url.searchParams.get('phone') ?? null;
	if (!phone || phone.length != 10 || isNaN(phone)) {
		throw redirect(303, '/login');
	}
	return { phone: phone };
}

export const actions = {
	reset: async (event) => {
		const uniqueId = uuid();
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
			const phoneResponse = resp?.data?.user?.phone.substring(2);
			if (!resp.ok) {
				return fail(400, { phone: phone, incorrect: true });
			} else {
				const updated = await db('users').where('phone', phoneResponse).update({
					reset: uniqueId
				});
				if (updated > 0) {
					pass = true;
				} else {
					return fail(400, { phone, incorrect: true });
				}
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (pass) {
			throw redirect(303, `/change-password?token=${uniqueId}`);
		}
	}
};

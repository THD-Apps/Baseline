import { redirect, fail } from '@sveltejs/kit';
import db from '$lib/server/db';
import DescopeClient from '@descope/node-sdk';

export const actions = {
	loginUser: async (event) => {
		let request = event.request;
		let pass = false;
		const data = await request.formData();
		const phone = data.get('phone');
		try {
			if (!phone || phone.length != 10 || isNaN(phone)) {
				return fail(400, { missing: true });
			}
			const rows = await db('users').select().where({ phone: phone });

			if (rows.length > 0) {
				pass = true;
				const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
				const resp = await descopeClient.otp.signUpOrIn['sms']('+1' + phone);
				if (!resp.ok) {
					return fail(400, { error: true });
				}
			} else {
				return fail(400, { incorrect: true });
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (pass) {
			throw redirect(303, `/login-otp-confirm?phone=${phone}`);
		}
	}
};

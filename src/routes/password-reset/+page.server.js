import { redirect, fail } from '@sveltejs/kit';
import db from '$lib/server/db';
import DescopeClient from '@descope/node-sdk';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '$lib/server/email';
import { config } from 'dotenv';

config();

export const actions = {
	reset: async (event) => {
		const uniqueId = uuid();
		let request = event.request;
		let pass = false;
		const data = await request.formData();
		const user = data.get('user');
		const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(user);
		const isPhone = user.length == 10 && !isNaN(user);

		try {
			if (!isPhone && !isEmail) {
				return fail(400, { missing: true });
			}
			if (isPhone) {
				const rows = await db('users').select().where({ phone: user });
				if (rows.length > 0) {
					pass = true;
					const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_ID });
					const resp = await descopeClient.otp.signUpOrIn['sms']('+1' + user);
					if (!resp.ok) {
						return fail(400, { error: true });
					}
				} else {
					return fail(400, { incorrect: true });
				}
			} else if (isEmail) {
				const updated = await db('users').where('email', user).update({
					reset: uniqueId
				});
				if (updated > 0) {
					sendEmail(
						user,
						'Password Reset Link',
						`Our records indicate that you requested to change your password.  To change your password, please click on the link below.\n\n${process.env.ROOT_URL}/change-password?token=${uniqueId}\n\nThe link will be valid for the next ten minutes.\nIf you did not make this request, please disregard this email.`
					);
				}
				return fail(200, { success: true });
			}
		} catch (error) {
			return fail(400, { error: true });
		}
		if (pass) {
			throw redirect(303, `/password-reset-confirm?phone=${user}`);
		}
	}
};

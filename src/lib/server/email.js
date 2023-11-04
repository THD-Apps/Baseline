import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export async function sendEmail(to, subject, message, fromLine = 'TUG Brands Account Maintenance') {
	const transporter = nodemailer.createTransport({
		host: 'smtp.titan.email',
		port: 465,
		secure: true, // Set to true if using SSL
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: `${fromLine} <${process.env.EMAIL_ADDRESS}>`,
		to: to,
		subject: subject,
		text: message
	};

	return transporter.sendMail(mailOptions);
}

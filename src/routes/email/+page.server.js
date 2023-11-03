import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

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
	from: `"TUG Brands Account Maintenance" <${process.env.EMAIL_ADDRESS}>`,
	to: 'tbeckett1211@gmail.com',
	subject: 'Password Reset',
	text: 'Here is your password reset link: https://example.com/reset-password'
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.log('Error sending email: ' + error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});

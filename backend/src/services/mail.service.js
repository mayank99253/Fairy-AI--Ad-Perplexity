import nodemailer from "nodemailer"
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
        type: "OAuth2",
        user: ENV.GOOGLE_USER,
        clientId: ENV.GOOGLE_CLIENT_ID,
        clientSecret: ENV.GOOGLE_CLIENT_SECRET,
        refreshToken: ENV.GOOGLE_REFRESH_TOKEN,
    },
});

transporter.verify()
    .then(() => { console.log("Email transpoter Ready To Send Email") })
    .catch((error) => { console.log("Email Transpoter Failed To Connect", error) });

export async function sendEmail({ to, subject, text, html }) {
    try {

        const mailOptions = {
            from: ENV.GOOGLE_USER, // sender address
            to: to, // list of recipients
            subject:subject, // subject line
            text: text, // plain text body
            html: html, // HTML body
        }
        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}
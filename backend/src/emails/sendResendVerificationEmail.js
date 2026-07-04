import { sendEmail } from "../services/mail.service.js";

export const SendingResendEmail = async (verificationUrl, email) => {

    await sendEmail({
        to: email,
        subject: "Welcome To Orbit",
        text: "Welcome to Orbit! Please verify your email by copying and pasting this link into your browser: ${verificationUrl}",
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #333333;">Welcome to Orbit! </h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                    Thank you for signing up. Please verify your email address to get started and unlock full access to your account.
                </p>
                <div style="margin: 30px 0; text-align: center;">
                    <a href=${verificationUrl}
                       style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
                       Verify Email Address
                    </a>
                </div>
                <p style="color: #777777; font-size: 14px;">
                    If the button above doesn't work, copy and paste this link into your web browser:
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #999999; font-size: 12px; text-align: center;">
                    If you did not create an account with Orbit, you can safely ignore this email.
                </p>
            </div>
        `
    });
}
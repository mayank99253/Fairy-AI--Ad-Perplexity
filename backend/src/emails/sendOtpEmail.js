import { sendEmail } from "../services/mail.service.js ";


export const SendingOtpEmail = async(generateOtp , email) => {
    await sendEmail({
        to: email,
        subject: "Your Password Reset OTP",
        text: `Your password reset OTP is ${generateOtp}. It is valid for 10 minutes.`, // Plain text fallback
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; }
            .email-container { max-width: 550px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eef2f5; }
            .email-header { background-color: #4F46E5; padding: 30px; text-align: center; color: #ffffff; }
            .email-header h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
            .email-body { padding: 40px 30px; color: #334155; line-height: 1.6; }
            .email-body p { margin: 0 0 20px 0; font-size: 16px; }
            .otp-container { text-align: center; margin: 30px 0; padding: 15px; background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: 700; color: #4F46E5; letter-spacing: 6px; margin: 0; }
            .warning-text { font-size: 13px; color: #64748b; background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin-top: 25px; }
            .email-footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #eef2f5; }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h2>Password Reset Request</h2>
            </div>
            
            <div class="email-body">
                <p>Hello,</p>
                <p>We received a request to reset the password for your account. Please use the 6-digit One-Time Password (OTP) below to proceed with the reset:</p>
                
                <div class="otp-container">
                    <h1 class="otp-code">${generateOtp}</h1>
                </div>
                
                <p>For security purposes, this OTP is only valid for <strong>10 minutes</strong>.</p>
                
                <div class="warning-text">
                    <strong>Security Notice:</strong> If you did not request this change, please ignore this email. Your password remains completely secure.
                </div>
            </div>
            
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Orbit. All rights reserved.</p>
                <p>This is an automated email, please do not reply directly to this message.</p>
            </div>
        </div>
    </body>
    </html>`
    });
}
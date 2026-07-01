import { apiError } from "../config/errorHandler.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import { ENV } from "../config/env.js";
import { generateToken } from "../config/generateToken.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"


export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const AlreadtExistUser = await userModel.findOne({ email })
        if (AlreadtExistUser) return apiError(res, 409, "Email or username already exists. Please use a different one.")

        if (AlreadtExistUser.username) return apiError(res, 409, "Email or username already exists. Please use a different one.")

        // Create user
        const user = await userModel.create({
            username,
            email,
            password
        });

        const verificationToken = jwt.sign({ userEmail: user.email }, ENV.JWT_SECRET, { expiresIn: "1d" });

        // 1. Construct the unique verification URL
        const verificationUrl = `${ENV.BASE_URL}/verify-email?token=${verificationToken}`;

        // 2. Send the email using your template
        await sendEmail({
            to: email,
            subject: "Welcome To Orbit",
            text: "Welcome to Orbit! Please verify your email by copying and pasting this link into your browser: ${verificationUrl}",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
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

        const userResponse = user.toObject()
        delete userResponse.password;
        // Success
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userResponse
        });

    } catch (error) {
        return apiError(res, 500, error.message);
    }
};

export const loginController = async (req, res,) => {
    try {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        }).select("+password");

        if (!user) return apiError(res, 401, "Invalid email or username");

        if (!user.verified) {
            return apiError(res, 403, "Please verify your email first");
        }

        const MatchPassword = await bcrypt.compare(password, user.password)
        if (!MatchPassword) return apiError(res, 401, "Invalid email or username");

        const userResponse = user.toObject()
        delete userResponse.password

        await generateToken(res, user._id)

        return res.status(200).json({ message: "Logged in", userResponse })
    } catch (error) {
        console.error(error.message)
        return apiError(res, 500, "Internal Server Error")
    }
}
export const logoutController = async (_, res,) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error")
    }
}

//Use for the Email Verification 
export const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.query;

        const decoded = await jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return apiError(res, 401, "Unauthorized Token");

        const user = await userModel.findOne({
            email: decoded.userEmail
        });
        if (!user) return apiError(res, 401, "Unauthorized Token");

        user.verified = true
        await user.save();

        // Inside your controller function
        const loginUrl = `http://localhost:5173/login`; // Replace with your login page URL

        const htmlResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

    <div style="background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); max-width: 440px; width: 100%; text-align: center; box-sizing: border-box; border: 1px solid #e2e8f0; margin: 20px;">
        
        <!-- Success Icon -->
        <div style="background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
            <svg style="width: 32px; height: 32px; color: #16a34a;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>

        <!-- Heading -->
        <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
            Account Verified!
        </h1>

        <!-- Message -->
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
            Thanks for connecting with us! Your email has been successfully verified, and your account is ready. You can now log in to your dashboard.
        </p>

        <!-- Modern CTA Button -->
        <a href="${loginUrl}" style="display: block; background-color: #4f46e5; color: #ffffff; padding: 14px 24px; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; transition: background-color 0.2s ease; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
            Log In to Your Account
        </a>

        <!-- Footer -->
        <p style="color: #94a3b8; font-size: 13px; margin: 32px 0 0 0;">
            Need help? Contact our <a href="mailto:support@yourdomain.com" style="color: #4f46e5; text-decoration: none; font-weight: 500;">support team</a>.
        </p>
    </div>

</body>
</html>
`;

        // Send the HTML response
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlResponse);
    } catch (error) {
        return apiError(res, 500, error.message)
    }
}
//use for the Get User 
export const getUserController = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({ message: "User fetched successfully", user })
    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error")
    }
}

/**
 * Handles password recovery requests.
 * Finds the user by email or username, generates a secure OTP,
 * hashes and stores it with an expiration time,
 * sends the OTP via email,
 * and returns a temporary forgot-password JWT.
 */
export const forgetPasswordController = async (req, res) => {
    try {
        const { identifier } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) return res.status(200).json({
            message: "If an account exists, we've sent a password reset OTP."
        });

        const generateOtp = crypto.randomInt(100000, 1000000).toString()

        const hashOtp = await bcrypt.hash(generateOtp, 10);

        const emailHtml = `
<!DOCTYPE html>
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
</html>
`;

        await sendEmail({
            to: user.email,
            subject: "Your Password Reset OTP",
            text: `Your password reset OTP is ${generateOtp}. It is valid for 10 minutes.`, // Plain text fallback
            html: emailHtml
        });

        user.resetOtp = hashOtp,
            user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // valid for the 10 min
        await user.save();

        const forgetPasswordToken = jwt.sign({ userId: user._id, purpose: "forget-password" }, ENV.JWT_SECRET, { expiresIn: "10m" });

        return res.status(200).json({ message: "Opt sent successfully , please check your Email", forgetPasswordToken: forgetPasswordToken })
    } catch (error) {
        console.error(error);
        return apiError(res, 500, "Internal Server Error")
    }
}
/**
 * Verifies the submitted OTP.
 * Validates the temporary forgot-password JWT,
 * checks OTP existence and expiration,
 * compares the hashed OTP,
 * clears OTP data after successful verification,
 * and returns a temporary reset-password JWT.
 */
export const verifyOtpController = async (req, res) => {
    try {
        const { otp } = req.body;
        const forgetPasswordToken = req.headers['authorization'];

        if (!otp || !forgetPasswordToken) {
            return apiError(res, 400, "OTP and Forget Password Token are required");
        }
        let token;

        if (forgetPasswordToken && forgetPasswordToken.startsWith('Bearer ')) {
            // Split the string by space and take the second part
            token = forgetPasswordToken.split(' ')[1];
        } else {
            return apiError(res, 400, "Forget Password Token is required in the Authorization header");
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return apiError(res, 401, "Unauthorized Token");

        if (!decoded.purpose || decoded.purpose !== "forget-password") {
            return apiError(res, 400, "Invalid token purpose");
        }

        const user = await userModel.findById(decoded.userId);
        if (!user) return apiError(res, 404, "User not found");

        if (!user.resetOtp || !user.resetOtpExpiresAt) {
            return apiError(res, 400, "No OTP found for this user. Please request a new one.");
        }
        if (user.resetOtpExpiresAt < new Date()) {
            user.resetOtp = null;
            user.resetOtpExpiresAt = null;
            await user.save();

            return apiError(
                res,
                400,
                "OTP has expired. Please request a new OTP."
            );
        }

        const verifyOtp = await bcrypt.compare(otp, user.resetOtp);
        if (!verifyOtp) return apiError(res, 400, "Invalid OTP");

        user.resetOtp = null;
        user.resetOtpExpiresAt = null;
        await user.save();

        const newForgetPasswordToken = jwt.sign({ userId: user._id, purpose: "reset-password" }, ENV.JWT_SECRET, { expiresIn: "10m" });

        return res.status(200).json({ message: "OTP verified successfully", newForgetPasswordToken: newForgetPasswordToken });

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return apiError(res, 401, "OTP Expired , Please request a new one");
        }
        console.error(error);
        return apiError(res, 500, "Internal Server Error");
    }
}
/**
 * Resets the user's password.
 * Validates the reset-password JWT,
 * updates the user's password,
 * triggers automatic password hashing through the Mongoose pre-save middleware,
 * clears password recovery fields,
 * and completes the password reset process.
 */
export const resetPasswordController = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const resetPasswordToken = req.headers['authorization'];

        let token;
        if (resetPasswordToken && resetPasswordToken.startsWith('Bearer ')) {
            // Split the string by space and take the second part
            token = resetPasswordToken.split(' ')[1];
        } else {
            return apiError(res, 400, "Forget Password Token is required in the Authorization header");
        }
        if (!newPassword || !token) {
            return apiError(res, 400, "New password and Forget Password Token are required");
        }

        const decoded = await jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return apiError(res, 401, "Unauthorized Token");
        if (!decoded.purpose || decoded.purpose !== "reset-password") {
            return apiError(res, 400, "Invalid token purpose");
        }

        const user = await userModel.findById(decoded.userId);

        if (!user) return apiError(res, 404, "User not found");

        user.password = newPassword;
        user.resetOtp = null;
        user.resetOtpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return apiError(res, 401, "Unauthorized Token");
        }
        console.error(error);
        return apiError(res, 500, "Internal Server Error");
    }
}
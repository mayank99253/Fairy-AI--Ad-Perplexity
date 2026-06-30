import { apiError } from "../config/errorHandler.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ENV } from "../config/env.js";
import { generateToken } from "../config/generateToken.js";

export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const AlreadtExistUser = await userModel.findOne({ email })
        if (AlreadtExistUser) return apiError(res , 409 , "Email or username already exists. Please use a different one.")

        if(AlreadtExistUser.username) return apiError(res , 409 , "Email or username already exists. Please use a different one.")

        // Create user
        const user = await userModel.create({
            username,
            email,
            password
        });

        const verificationToken = await jwt.sign({ userEmail: user.email }, ENV.JWT_SECRET, { expiresIn: "1d" });

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

export const loginController = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        }).select("+password");

        if (!user) return apiError(res, 401, "Invalid Credentials");

        if (!user.verified) {
            return apiError(res, 403, "Please verify your email first");
        }

        const MatchPassword = await bcrypt.compare(password, user.password)
        if (!MatchPassword) return apiError(res, 401, "Invalid Credentials");

        const userResponse = user.toObject()
        delete userResponse.password

        await generateToken(res, user._id)

        return res.status(200).json({ message: "Logged in", userResponse })
    } catch (error) {
        console.error(error.message)
        return apiError(res, 500, "Internal Server Error")
    }
}
export const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message : "Logged Out Successfully"});
    } catch (error) {
        console.error(error)
        return apiError(res , 500 , "Internal Server Error")
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
export const getUserController = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({message : "User fetched successfully" , user})
    } catch (error) {
        console.error(error)
        return apiError(res , 500 , "Internal Server Error")
    }
}
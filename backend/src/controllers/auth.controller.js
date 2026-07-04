import { apiError } from "../config/errorHandler.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import { ENV } from "../config/env.js";
import { generateToken } from "../config/generateToken.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { SendingWelcomeEmail } from "../emails/sendWelcomeEmail.js";
import { SendingResendEmail } from "../emails/sendResendVerificationEmail.js";
import { SendingOtpEmail } from "../emails/sendOtpEmail.js";
import { AlreadyVerifiedHtml, VerifiedUserEmail } from "../templates/email.template.js";

export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const AlreadtExistUser = await userModel.findOne({ email })
        if (AlreadtExistUser) return apiError(res, 409, "Email or username already exists. Please use a different one.")

        const AlreadyExistUsername = await userModel.findOne({ username })
        if (AlreadyExistUsername) return apiError(res, 409, "Email or username already exists. Please use a different one.")

        // Create user
        const user = await userModel.create({
            username,
            email,
            password,
            verificationEmailSentAt: Date.now()
        });

        const verificationToken = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: "1d" });

        // Construct the unique verification URL
        const verificationUrl = `${ENV.BASE_URL}/verify-email?token=${verificationToken}`;

        //  Send the email using your template
       await SendingWelcomeEmail(verificationUrl , email)

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
            _id : decoded.userId
        });
        if (!user) return apiError(res, 401, "Unauthorized Token");

        // Inside your controller function
        const loginUrl = `http://localhost:5173/login`; // Replace with your login page URL

        // 1. Check if the user is already verified
        if (user.verified) {
            const alreadyVerifiedHtml =AlreadyVerifiedHtml(loginUrl)
            res.setHeader('Content-Type', 'text/html');
            return res.send(alreadyVerifiedHtml); // return lagana zaroori hai taaki aage ka code na chale
        }

        //If user is NOT verified, verify them now
        user.verified = true;
        await user.save();

        const htmlResponse = VerifiedUserEmail(loginUrl)

        // Send the HTML response for newly verified user
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

        await SendingOtpEmail(generateOtp , user.email);

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


export const resendEmailVerificationController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return apiError(res, 404, "User not found");

        if (user.verified) return apiError(res, 400, "User is already verified");

        const COOLDOWN_TIME = 3 * 60 * 1000; // 3 minutes in milliseconds
        const currentTime = Date.now();

        if (user.verificationEmailSentAt) {
            const timePassed = currentTime - new Date(user.verificationEmailSentAt).getTime();

            if (timePassed < COOLDOWN_TIME) {
                // Calculate remaining seconds
                const timeLeft = Math.ceil((COOLDOWN_TIME - timePassed) / 1000);

                return res.status(429).json({
                    message: `Please wait before requesting another email.`,
                    timeLeft: timeLeft // Sending remaining seconds back to frontend
                });
            }
        }


        // Generate a new verification token
        const verificationToken = jwt.sign({ userId: user._id, purpose: "email-verification" }, ENV.JWT_SECRET, { expiresIn: "1d" });
        // Send the verification email
        const verificationUrl = `${ENV.BASE_URL}/verify-email?token=${verificationToken}`;

        await SendingResendEmail(verificationUrl , email);
        user.verificationEmailSentAt = currentTime;
        await user.save();

        return res.status(200).json({ message: "Verification email resent successfully" });
    } catch (error) {
        console.error(error);
        return apiError(res, 500, "Internal Server Error");
    }
}


export const changePasswordController = async (req, res) => {
    try {
        const { confirmPassword, newPassword , oldPassword} = req.body;
        const userId = req.user._id;

        if(!confirmPassword || !newPassword || !oldPassword)  return apiError(res, 400, "All fields are required");

        if(confirmPassword !== newPassword)  return apiError(res, 400, "Passwords do not match");

        const user = await userModel.findById(userId).select("+password");
        if(!user) return apiError(res, 404, "User not found");

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return apiError(res, 400, "Old Password is incorrect");

        const isMatchNewpassword = await bcrypt.compare(newPassword, user.password);
        if(isMatchNewpassword) return apiError(res, 400, "New password cannot be the same as the current password");

        user.password = confirmPassword;
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
        
    } catch (error) {
        console.error(error);
        return apiError(res, 500, "Internal Server Error");
    }
}
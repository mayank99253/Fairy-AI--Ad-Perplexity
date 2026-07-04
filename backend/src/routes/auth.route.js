import express from "express"
import {
    changePasswordController,
    forgetPasswordController,
    getUserController,
    loginController,
    logoutController,
    resendEmailVerificationController,
    resetPasswordController,
    signupController,
    verifyEmailController,
    verifyOtpController
} from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validation.middlware.js";
import { loginValidator, signupValidator } from "../validators/auth.validator.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";


export const authRouter = express.Router()

/** 
 * @route   POST /api/auth/signup
 * @desc    Register a new user account
 *  @access  Public
 */
authRouter.post("/signup",signupValidator , validator ,  signupController);

/**
 *  @route   POST /api/auth/login
 * @desc    Authenticate user and log them in
 * @access  Public
 */
authRouter.post("/login",loginValidator , validator, loginController);

/**
 *  @route   POST /api/auth/logout
 *  @desc    Log out the currently authenticated user
 *  @access  Private
 */
authRouter.post("/logout", logoutController);

/** 
 * @route   GET /api/auth/verify-email
 *  @desc    Verify user's email using verification code
 *  @access  Public
 */
authRouter.get("/verify-email", verifyEmailController);

/**
 * @route   GET /api/auth/get-user
 *  @desc    Get authenticated user's profile
 *  @access  Private
 **/
authRouter.get("/get-user",protectedRoute ,  getUserController);
/**
 * @route   POST /api/auth/forget-password
 * @desc    Generate and send a password reset OTP to the user's registered email
 * @access  Public
 */
authRouter.post("/forget-password", forgetPasswordController);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify the password reset OTP and issue a temporary reset password token
 * @access  Public
 */
authRouter.post("/verify-otp", verifyOtpController);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset the user's password after successful OTP verification
 * @access  Public
 */
authRouter.post("/reset-password", resetPasswordController);

/**
 * @route   POST /api/auth/resend-email-verification
 * @desc    Resend the email verification link to the user
 * @access  Public
 */
authRouter.post("/resend-email-verification", resendEmailVerificationController);

/**
 * @route   GET /api/auth/change-password
 * @desc    Change the user's password after successful authentication
 * @access  Private
 */
authRouter.post("/change-password", protectedRoute, changePasswordController);


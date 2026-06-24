import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/mail.services.js";
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    const UserAlreadyExist = await userModel.findOne({
        $or: [
            { email }, { username }
        ]
    });

    if (UserAlreadyExist) {
        return res.status(409).json({
            message: "User with this Email or User Name Already Exist",
            success: false,
            erorr: "User Already Exists"
        });
    }

    const user = await userModel.create({
        username, email, password
    });

    const token = jwt.sign({ email: user.email }, ENV.JWT_SECRET, {
        expiresIn: "7d"
    });

    // const verifyUrl = `${ENV.BACKEND_URL}token=${token}`

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        text: "Verify Your Email - Click the link in the HTML version",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Perplexity, ${username}!</h2>
            <p>Thank you for creating an account.</p>
            <p>Please verify your email address by clicking the button below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${token}" 
               style="background:#4F46E5; color:white; padding:12px 24px; 
                      text-decoration:none; border-radius:6px; display:inline-block;">
              Verify Email
            </a>
            <p style="color:#666; font-size:12px; margin-top:20px;">
              If you didn't create this account, ignore this email.
            </p>
          </div>
`
    });



    res.status(201).json({
        message: "User Registered",
        success: true,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
    })
};

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email: identifier.toLowerCase() }, { username: identifier }
            ]
        });

        if (!user) return res.status(404).json({
            message: "User Not Found",
            success: false,
            error: "Invalid Credientials"
        });

        if (!user.verified) return res.status(401).json({
            message: "Please Verify Your Email",
            success: false,
            error: "Email Not Verified"
        })

        const ConfiemPassword = await bcrypt.compare(password, user.password);
        if (!ConfiemPassword) return res.status(40).json({
            message: "Invalid Credientials",
            success: false,
            error: "Invalid Credientials"
        });

        const token = await jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: `${user.username} Logged In Successfully`,
            success: true,
            user: {
                _id: user._id,
                username: user.username,
            }
        })

    } catch (error) {
        console.error("Error in Login ", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const logout = async () => { }

export const GetMe = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await userModel.findById(userId).select("-password")
        // if (!user) {
        //     return res.status(401).json({
        //         message: "Unauthorized User: User Not Found",
        //         sucess: false,
        //         error: "User Not Found"
        //     })
        // };

        return res.status(200).json({
            message: "Fetched User Response",
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            sucess: false,
            error: error
        })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
        return res.status(400).json({
            message: "Email Verifcation Failed",
            success: false,
            err: "Invalid Token"
        })
    }

    if (user.verified) {
        const html = alreadyVerifiedPage();
        return res.send(html);
    } else {
        user.verified = true;
        await user.save();
        const html = newlyVerifiedPage();
        return res.send(html);
    }
}

/**
 * @Pages for email verification and Already Verification
 */

const baseStyles = `
    body {
        margin: 0;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        background: #f4f6f8;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .card {
        background: #ffffff;
        padding: 40px 35px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        text-align: center;
        max-width: 420px;
        width: 90%;
    }
    .icon {
        width: 64px;
        height: 64px;
        margin-bottom: 18px;
    }
    h1 {
        font-size: 22px;
        margin: 0 0 10px;
        color: #1a1a1a;
    }
    p {
        color: #555;
        font-size: 15px;
        line-height: 1.5;
        margin: 0 0 22px;
    }
    a.btn {
        display: inline-block;
        background: #4f46e5;
        color: #fff;
        text-decoration: none;
        padding: 12px 28px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        transition: background 0.2s;
    }
    a.btn:hover {
        background: #4338ca;
    }
`;

function newlyVerifiedPage() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Email Verified</title>
        <style>${baseStyles}</style>
    </head>
    <body>
        <div class="card">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
            </svg>
            <h1>Email Verified Successfully!</h1>
            <p>Thanks for confirming your email. Your account is now active and ready to use.</p>
            <a class="btn" href="${ENV.CLIENT_URL}/login">Login Now</a>
        </div>
    </body>
    </html>
    `;
}

function alreadyVerifiedPage() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Already Verified</title>
        <style>${baseStyles}</style>
    </head>
    <body>
        <div class="card">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
            </svg>
            <h1>Already Verified</h1>
            <p>This email is already verified. You can go ahead and log in to your account.</p>
            <a class="btn" href="${ENV.CLIENT_URL}/login">Go to Login</a>
        </div>
    </body>
    </html>
    `;
}
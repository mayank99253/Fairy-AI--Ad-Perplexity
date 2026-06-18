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
        const {identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email : identifier.toLowerCase() }, { username : identifier }
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
            error : "Email Not Verified"
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

    user.verified = true;
    await user.save()

    const html = `
    <h1>Email Verification </h1>
    <p>Thanks for connecting with Us</p>
    <a href="http://localhost:3000/api/auth/login" >Login Here </a>
    <p>Thank You So Much</p>
    `

    res.send(html)
}
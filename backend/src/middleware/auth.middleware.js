import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js";
import { userModel } from "../models/user.model.js";

export const ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized User: Token not Provided",
                sucess: false,
                error: "No Token Provided"
            })
        }

        const decoded = await jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized User: Invalid Token",
                sucess: false,
                error: "Invalid Token"
            })
        };

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                message: "Unauthorized User: User Not Found",
                sucess: false,
                error: "User Not Found"
            });
        };

        req.user = user;

        next()

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            sucess: false,
            error: error
        })
    }

}
import { ENV } from "../config/env.js";
import { apiError } from "../config/errorHandler.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return apiError(res, 401, "Authentication required");

        if (!ENV.JWT_SECRET) return apiError(res, 500, "Internal Server Error")

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return apiError(res, 401, "Invalid token");

        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) return apiError(res, 404 ,"User Not Found")

        req.user = user
        next()

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return apiError(res, 401, "Invalid or expired token");
        }

        console.error(error);
        return apiError(res, 500, "Internal Server Error"); 
    }
}
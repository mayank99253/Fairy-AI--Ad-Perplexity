import jwt from "jsonwebtoken"
import { ENV } from "./env.js"
import { apiError } from "./errorHandler.js"

export const generateToken = (res, userId) => {
    try {
        if (!ENV.JWT_SECRET) return apiError(res, 500, "Internal Server Error")

        if (!userId) return apiError(res, 500, "Internal Server Error")
        const token = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax", // lax in the development or none in the production
            secure: false // false in the development . true in the production
        })

        return token;
    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error")
    }
}
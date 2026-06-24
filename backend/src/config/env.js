import dotenv from "dotenv";
dotenv.config()

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER,
    JWT_SECRET : process.env.JWT_SECRET,
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY,
}
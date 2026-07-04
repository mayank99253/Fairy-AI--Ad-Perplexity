import dotenv from "dotenv"
dotenv.config();


export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET  : process.env.JWT_SECRET ,
    BASE_URL : process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY,

}
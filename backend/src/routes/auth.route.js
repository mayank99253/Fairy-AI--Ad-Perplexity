import expres from "express"
import { GetMe, login, logout, signup , verifyEmail } from "../controllers/auth.controller.js";
import { loginValidator, signupValidator } from "../validator/auth.validator.js";
import { validation } from "../middleware/authValidator.middleware.js";
import { ProtectedRoute } from "../middleware/auth.middleware.js";

export const authRouter = expres.Router();

authRouter.post('/signup', signupValidator , validation , signup)
authRouter.post('/login' , loginValidator , validation , login)
authRouter.get('/logout' , logout)

/**
 * @Description Access the Details of Logged In user 
 * @Access Private
 * @Protected Trur 
 */
authRouter.get("/get-me" , ProtectedRoute, GetMe)

authRouter.get("/verify-email" , verifyEmail)
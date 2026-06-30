import { body } from "express-validator";

export const signupValidator = [

    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export const loginValidator = [
    body("identifier")
    .trim()
    .notEmpty().withMessage("All fields are required")
    ,

    body("password").notEmpty("All Fields are required")
]
import { body, ExpressValidator } from "express-validator"

export const signupValidator = [
    body("email").notEmpty()
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("All Fields are Required"),

    body("username")
        .notEmpty().withMessage("All Fields are Required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 to 30 charecters")
        .trim(),

    body("password")
        .notEmpty().withMessage("All Fields Are Required")
        .isLength({ min: 6 }).withMessage("Password Must Be atleast 6 charecter"),
];

export const loginValidator = [
    body("identifier")
        .trim()
        .notEmpty()
        .withMessage("Email or Username is required"),

    body("password")
        .notEmpty().withMessage("All Fields Are Required")
        .isLength({ min: 6 }).withMessage("Password Must Be at least 6 charecter"),
];